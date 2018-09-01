import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from "@angular/router";
// import * as accounts from '../accounts';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  data: any = {};
  auth: string;
  private apiURL = 'http://localhost:3000/api/auth?username=';
  constructor(private router: Router, private form: FormsModule, private http: Http) { }

  ngOnInit() {
  }

  
  loginUser(event) {
    event.preventDefault();
    this.getAuth();
    /*for (var i = 0; i < accounts.accounts.length; i++) {
      console.log('i= ' + i + ', comparing account: ' + accounts.accounts[i].username + ' with username: ' + this.username);
      if (accounts.accounts[i].username == this.username) {
        sessionStorage.setItem('username', this.username);
        sessionStorage.setItem('accountNo', i.toString());
        this.router.navigateByUrl('/account');
        break;
      }
      if (i == accounts.accounts.length - 1) {
        alert('Username does not exist');
      }
    }*/
  }


  getAuth() {
    this.data = this.http.get(this.apiURL + this.username);
    console.log(this.data);
    this.data.subscribe(response => {
      console.log(response._body)
      console.log(typeof response._body);
      var details = response._body;
      this.authenticate(details)
    });
  }

  authenticate(details) {
    if (details == 'user') {
      sessionStorage.setItem('username', this.username);
      sessionStorage.setItem('role', 'user');
      this.router.navigateByUrl('/account');
    } else if (details == 'groupAdmin') {
      sessionStorage.setItem('username', this.username);
      sessionStorage.setItem('role', 'groupAdmin');
      this.router.navigateByUrl('/account');
    } else if (details == 'superAdmin') {
      sessionStorage.setItem('username', this.username);
      sessionStorage.setItem('role', 'superAdmin');
      this.router.navigateByUrl('/account');
    } else {
      alert('Username does not exist');
      console.log(details);
    }
  }
  /*
  getData() {
    this.getAuth().subscribe(data => {
      console.log(data);
      this.data = data
    });
  }*/
}
