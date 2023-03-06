import { Component, OnInit } from '@angular/core';
import { Genero } from 'src/app/models/genero';
import { Pelicula } from 'src/app/models/modelPeliculas';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {
  constructor(private dataService:DataServiceService){}
  ngOnInit(): void {
    this.dataService.state$.subscribe(state=>{
      this.Movie=state.movieDetail,
      this.genres=state.genresMovie
    })
  }
  Movie=<Pelicula>{}
  genres:Genero[]=[]
}
