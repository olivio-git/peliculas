import { Component, OnInit } from '@angular/core';
import { DataServiceService } from './services/data-service.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private dataService: DataServiceService,private router: Router) {}
  ngOnInit() {
    //this.dataService.checkAuth();
    //this.router.navigate(['/']); // ruta de la página de inicio
  }
}
