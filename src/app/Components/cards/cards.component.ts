import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/models/modelPeliculas';
import { DataService } from 'src/app/models/modelService';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  movies:Pelicula[]=[];
  constructor(private dataService: DataServiceService){}
  ngOnInit(): void {
    this.dataService.state$.subscribe(state=>{
      if(state.movies){
        this.movies=state.movies;
        console.log(this.movies)
      }
    })
  }
}
