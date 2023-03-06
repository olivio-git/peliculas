import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any;
  table:any;
  count:any;
  constructor(public dataService: DataServiceService) {
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
      }
    });
  }

  ngOnInit(): void {
    
  }

  // login(): void {
  //   this.dataService.signInWithGoogle();
  // }
}