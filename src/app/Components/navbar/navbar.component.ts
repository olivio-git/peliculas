import { Component } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user: any;
  constructor(public dataService: DataServiceService) {
    this.dataService.state$.subscribe((state) => {
      this.user = state.user.user;
    });
  }
}
