import { Component, OnInit } from '@angular/core';
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
    this.Movie=<Pelicula>{}
    this.dataService.state$.subscribe(state=>{
      this.Movie=state.movieDetail
    })
  }
  Movie=<Pelicula>{}
}
