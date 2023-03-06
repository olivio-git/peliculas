import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DataService } from '../models/modelService';
import { User } from '../models/modelUser';
import { firebaseConfig } from 'src/environments/firebaseConfig';
import { getAllMovies, GetMovie, postMovieCar } from '../controllers/controllersMovies';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import jwt_decode from 'jwt-decode';
import { DecodedToken } from '../models/dekodedToken';
import { Pelicula } from '../models/modelPeliculas';


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
    //this.checkAuth() //checar si existe tokken y logear
    console.log(this.stateSubject.value)
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
  async postCart(pelicula:Pelicula){
    if(this.stateSubject.value.user.user){
      await postMovieCar(this.http,pelicula,this.stateSubject.value.user.user.uid)
      .then(()=>{
        alert(pelicula.title.toString()+' agregado al carrito exitosamente')
      }).catch((error)=>{
        alert(error.message)
      })
    }else{
      alert('Inicia seción por favor');
    }
  }
  // async checkAuth() {
  //   let obj: User;
  //   const currentTable=this.userTableSubject.value;

  //   const currentState = this.stateSubject.value;
  //   const token:any = localStorage.getItem('authToken');
  //   const decodedToken = jwt_decode(token) as DecodedToken;
  //       obj = {
  //       uid: decodedToken.user_id,
  //       name: decodedToken.name,
  //       email: decodedToken.email,
  //       image: decodedToken.picture
  //       }
  //       this.stateSubject.next({
  //         ...currentState,
  //       user: {
  //       user: obj,
  //       token: token
  //       }
  //       });
  //       const database = firebase.database();
  //       const userRef = database.ref('Usuarios/' + decodedToken.user_id);
  //       userRef.once('value', (snapshot) => {
  //       const userData = snapshot.val();
  //       if (!userData) {
  //         const newUser = {  
  //           name: decodedToken?.name,
  //           email: decodedToken?.email,
  //           cart: {}
  //         };
  //         this.userTableSubject.next({
  //           ...currentTable,
  //           ...{ initialUserTable: newUser }
  //         })        
  //         userRef.set(newUser);
  //       } else {
  //         userRef.on('value', (snapshot) => {
  //           const userData = snapshot.val();
  //           console.log(userData)
  //           this.userTableSubject.next({
  //             ...currentTable,
  //             ...{ initialUserTable: userData }
  //           });
  //         });
  //       }
  //     });
  // }
  

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
            movies:{dummyProperty: ''}
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




