import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './Components/cards/cards.component';
import { CartComponent } from './Components/cart/cart.component';
import { DetallesComponent } from './Components/detalles/detalles.component';
import { FiltrosComponent } from './Components/filtros/filtros.component';
import { HomeComponent } from './Components/home/home.component';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';

const routes: Routes = [
  {path:'',redirectTo:'/landing',pathMatch:'full'},
  {path:'landing',component: LandingPageComponent},
  {path:'home',component:HomeComponent },
  {path:'cards',component:CardsComponent},
  {path:'detalles/:key', component:DetallesComponent},
  {path:'filtro',component:FiltrosComponent},
  {path:'home/cartDetails/:key',component:CartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
