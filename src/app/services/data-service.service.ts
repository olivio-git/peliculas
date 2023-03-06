import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DataService } from '../models/modelService';
import { User } from '../models/modelUser';
import { firebaseConfig } from 'src/environments/firebaseConfig';
import { getAllMovies, GetMovie } from '../controllers/controllersMovies';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService implements OnInit {
  
  private initialState:DataService={ //definimos nuestro estado en base a nuestro modelo DataService
    movies:[],
    movieDetail:{},
    user:{}
  }
  private stateSubject = new BehaviorSubject<DataService>(this.initialState); //definimos nuestro stateSubject
  state$ = this.stateSubject.asObservable();
  
  private initialUserTable: any = {};

  private userTableSubject = new BehaviorSubject<any>(this.initialUserTable);
  userTable$ = this.userTableSubject.asObservable();

  constructor(
    public http:HttpClient,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {
    this.getAllMoviesHandler();
    firebase.initializeApp(firebaseConfig.firebase);
    // Inicializar el subject de userTable
  }

  ngOnInit() {
  }

  async getAllMoviesHandler() {
    try {
      const currentState = this.stateSubject.value;
      const result = await getAllMovies(this.http);
      this.stateSubject.next({
        ...currentState,
        movies: result
      })
    } catch (error) {
      console.log(error);
    }
  }

  async getMovie(key:any){
    try{
      const currentState=this.stateSubject.value;
      const result=await GetMovie(this.http,key);
      this.stateSubject.next({
        ...currentState,
        movieDetail:result
      })
    }catch(error){}
  }

  async signInWithGoogle() {
    let obj: User;
    const currentState = this.stateSubject.value;
    const currentTable=this.userTableSubject.value;

    const provider = new firebase.auth.GoogleAuthProvider();
    await this.afAuth.signInWithPopup(provider)
    .then(async(result) => {
      const token = (result.user as any)._delegate.stsTokenManager.accessToken;
      await localStorage.setItem('authToken', token);
      if (result.user) {
        obj = {
          uid: result.user.uid,
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL
        }
        this.stateSubject.next({
          ...currentState,
          user: {
            user: obj,
            token: token
          }
        });
        const database = firebase.database();
        const userRef = database.ref('Usuarios/' + result.user.uid);
        userRef.once('value', (snapshot) => {
        const userData = snapshot.val();
        if (!userData) {
          console.log('if');
          const newUser = {  
            name: result.user?.displayName,
            email: result.user?.email,
            cart: []
          };
          this.userTableSubject.next({
            ...currentTable,
            ...{ initialUserTable: newUser }
          })        
          userRef.set(newUser);
        } else {
          console.log('else');
          userRef.on('value', (snapshot) => {
            const userData = snapshot.val();
            console.log(userData)
            this.userTableSubject.next({
              ...currentTable,
              ...{ initialUserTable: userData }
            });
          });
        }
      });
      }
    })
    .catch((error) => {
      console.log(error,'error');
    })
    console.log(currentTable)
  }

  async signOut() {
    const currentState = this.stateSubject.value;
    await this.afAuth.signOut();
    localStorage.removeItem('authToken');
    this.stateSubject.next({
      ...currentState,
      user: {
        user: {},
        token: 'null'
      }
    });
    this.userTableSubject.next({});
  }
}




// async checkAuth() {
  //   console.log('Check')
  //   const token = localStorage.getItem('authToken');
  //   console.log(token)
  //   if (token) {
  //     try {
  //       const userCredential = await firebase.auth().signInWithCustomToken(token);
  //       const user = userCredential.user;
  //       const obj: User = {
  //         name: user?.displayName,
  //         email: user?.email,
  //         image: user?.photoURL,
  //       }
  //       const currentState = this.stateSubject.value;
  //       this.stateSubject.next({
  //         ...currentState,
  //         user:{
  //           user: obj,
  //           token: token
  //         }
  //       });
  //     } catch (error) {
  //       console.log('Error en la autenticación automática', error);
  //     }
  //   }
  // }