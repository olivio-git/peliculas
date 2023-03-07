import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { FormLoginComponent } from './Components/form-login/form-login.component';
import { FormRegisterComponent } from './Components/form-register/form-register.component';
import { HomeComponent } from './Components/home/home.component';
//firebase
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireModule } from '@angular/fire/compat/';
import { firebaseConfig } from '../environments/firebaseConfig';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './Components/navbar/navbar.component';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { CardsComponent } from './Components/cards/cards.component';
import { DetallesComponent } from './Components/detalles/detalles.component';
import { CartComponent } from './Components/cart/cart.component';
import { ContCarComponent } from './Components/cont-car/cont-car.component';
import { FiltrosComponent } from './Components/filtros/filtros.component';
import { FooterComponent } from './Components/footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    FormLoginComponent,
    FormRegisterComponent,
    HomeComponent,
    NavbarComponent,
    CardsComponent,
    CartComponent,
    DetallesComponent,
    ContCarComponent,
    FiltrosComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule ,
    AngularFireModule.initializeApp(firebaseConfig.firebase),
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){
    firebase.initializeApp(firebaseConfig.firebase);
  }
}
