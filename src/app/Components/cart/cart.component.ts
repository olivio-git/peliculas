import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  user:any;
  table:any;

  count:any;
  keys:any;
  union:any;
  constructor(private dataService:DataServiceService){
    this.dataService.state$.pipe(
      distinctUntilChanged((prev, curr) => prev.user.user === curr.user.user)
    ).subscribe((state) => {
      this.user = state.user.user;
    });
    this.dataService.userTable$.pipe(
      distinctUntilChanged((prev, curr) => prev.initialUserTable === curr.initialUserTable)
    ).subscribe((state) => {
      if(state.initialUserTable){
        this.table = state.initialUserTable;
        this.count=Object.values(state.initialUserTable.movies);
        this.keys=Object.keys(state.initialUserTable.movies)
        this.union=this.keys.map((key:any,index:any)=>{
          return{
            key:key,
            movie:this.count[index]
          }
        })
      }
    });
  }
  ngOnInit():void {}
  async key(key:any){
    this.dataService.deleteCarMovie(this.user.uid,key);
  }
}
