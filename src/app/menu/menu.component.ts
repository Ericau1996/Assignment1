import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  username:string;
  constructor(private router: Router) { 
  }
  ngOnInit() {
    if(!sessionStorage.getItem('username')){

      console.log('No login');
      sessionStorage.clear();
      this.router.navigateByUrl('login');
    }else{


      this.username = sessionStorage.getItem('username');
      console.log("Session started for: "+ this.username);
 
    }
  }
  logout(){

    sessionStorage.clear();
    console.log('Session Cleared');
    this.router.navigateByUrl('login');
    
    
  }
}
