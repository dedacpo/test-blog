import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router,  location: Location) { 
    this.router.events.subscribe(val => {  
      this.route = 'home';
      this.menuActive = 'home';
      if (location.path() != '') {
        this.route = location.path();
      }
      if (this.route == '/blog') {
        this.menuActive = 'blog';
      }
      
  });
  }

  menuActive;
  route:any;
  ngOnInit() {
    
  }

}
