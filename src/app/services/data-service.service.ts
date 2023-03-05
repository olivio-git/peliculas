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
@Injectable({
  providedIn: 'root'
})
export class DataServiceService implements OnInit {

  constructor(
    public http:HttpClient,
    private afAuth: AngularFireAuth
  ) {
    firebase.initializeApp(firebaseConfig.firebase);
    this.getAllMoviesHandler();
  }

  private initialState:DataService={ //definimos nuestro estado en base a nuestro modelo DataService
    movies:[],
    movieDetail:{},
    user:{}
  }
  private stateSubject = new BehaviorSubject<DataService>(this.initialState); //definimos nuestro stateSubject
  state$ = this.stateSubject.asObservable();

  ngOnInit() {
  }
  async getAllMoviesHandler(){
    try {
      const currenState=this.stateSubject.value;
      const result=await getAllMovies(this.http);
      this.stateSubject.next({
        ...currenState,
        movies:result
      })
    } catch (error) {
      
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
    let obj:User;
    const currentState = this.stateSubject.value;
    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.signInWithPopup(provider)
    .then(async(result)=>{ //usuario logeado
      console.log(result.user)
      const token = (result.user as any)._delegate.stsTokenManager.accessToken; //recuperar token
      if(result.user){
        obj={
          name: result.user.displayName,
          email:result.user.email,
          image:result.user.photoURL,
        }
        await localStorage.setItem('authToken', token); //guardar mi token
        this.stateSubject.next({
          ...currentState,
          user:{
            user: obj,
            token: token
          }
        })  
      }
    }) 
  };

  async signOut() {
    const currentState = this.stateSubject.value;
    await this.afAuth.signOut();
    // Eliminar token de localStorage y propiedad user del servicio
    localStorage.removeItem('authToken');
    this.stateSubject.next({
      ...currentState,
      user:{
        user:'null',
        token:'null'
      }
    })
  };
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