import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './Components/cards/cards.component';
import { DetallesComponent } from './Components/detalles/detalles.component';
import { HomeComponent } from './Components/home/home.component';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';

const routes: Routes = [
  {path:'',redirectTo:'/landing',pathMatch:'full'},
  {path:'landing',component: LandingPageComponent},
  {path:'home',component:HomeComponent },
  {path:'cards',component:CardsComponent},
  {path:'detalles/:key', component:DetallesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
