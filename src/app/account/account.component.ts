import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
// import * as accounts from '../accounts';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  username: string;
  email: string;
  role: string;
  groupadmin: boolean;
  superadmin: boolean;
  availableRoles = ['user', 'groupAdmin'];
  availableRolesSP = ['user', 'superAdmin', 'groupAdmin'];
  constructor(private http: Http) { }

  ngOnInit() {
    
    this.username = sessionStorage.getItem('username');
    this.role = sessionStorage.getItem('role');
    if (this.role == 'superAdmin') {
      this.superadmin = true;
      console.log(this.superadmin);
    } else {
      this.superadmin = false;
    }
    if (this.role == 'groupAdmin') {
      this.groupadmin = true;
      console.log(this.groupadmin);
    } else {
      this.groupadmin = false;
    }
  }

  newUsername: string;
  newEmail: string;
  newRole: string;
  private apiURL = 'http://localhost:3000/api/reg?username=';
  data: any = {};


  createUser(event) {
    event.preventDefault();
    console.log(this.newUsername);
    console.log(this.newEmail);
    console.log(this.newRole);
    this.data = this.http.get(this.apiURL + this.newUsername + '&email=' + this.newEmail + '&role=' + this.newRole);
    this.data.subscribe(response => {
      console.log(response._body)
      console.log(typeof response._body);
    });
    //accounts.accounts.push({ username: this.newUsername, email: this.newEmail, role: this.newRole })
  }

}
