import { Component } from '@angular/core';
import { Pelicula } from 'src/app/models/modelPeliculas';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css']
})
export class FiltrosComponent {
  movies:any;
  constructor(private dataService: DataServiceService){}
  ngOnInit(): void {
    this.dataService.state$.subscribe(state=>{
      if(state.filterMovies.length!=0){
        this.movies=state.filterMovies;
      }
      else{
        this.movies=state.movies
      }
    })
  }
  detalles(key:any){
    this.dataService.getMovie(key)
  }
  async postCar(pelicula:Pelicula){
    this.dataService.postCart(pelicula);
  }
}
