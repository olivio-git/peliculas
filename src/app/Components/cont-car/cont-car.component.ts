import { Component } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-cont-car',
  templateUrl: './cont-car.component.html',
  styleUrls: ['./cont-car.component.css']
})
export class ContCarComponent {
  count:any;
  constructor(private dataService: DataServiceService){
    this.dataService.userTable$.subscribe(state=>{
      if(state.initialUserTable){
        this.count=Object.values(state.initialUserTable.movies);
      }
    })
  }
}
