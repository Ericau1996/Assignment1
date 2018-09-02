import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket/socket.service';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';


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
  availableRolesSP = ['user', 'superAdmin', 'groupAdmin', 'delete user'];
  constructor(private sockServ: SocketService, private router: Router, private http: Http) { }

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
    
    if (!sessionStorage.getItem('username')) {
      console.log('Not validated');
      sessionStorage.clear();
      alert("Not a valid User");
      this.router.navigateByUrl('login');
    } else if(this.role == 'groupAdmin'){
      this.username = sessionStorage.getItem('username');
    }else if(this.role == 'superAdmin'){
      this.username = sessionStorage.getItem('username');
    }else if(this.role == 'user'){
      this.username = sessionStorage.getItem('username');
      console.log("Session started for: " + this.username);
    }else{
      console.log('Not validated');
      sessionStorage.clear();
      alert("Not a valid User");
      this.router.navigateByUrl('login');
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
    if (this.newUsername != undefined && this.newEmail != undefined && this.newRole != undefined && this.newUsername.trim() != '' && this.newEmail.trim() != '') {
    this.data = this.http.get(this.apiURL + this.newUsername + '&email=' + this.newEmail + '&role=' + this.newRole);
    this.data.subscribe(response => {
      console.log(response._body)
      console.log(typeof response._body);
      if (response._body == 'true') {
        alert('User has been sucessfuly created/updated!')
        window.location.reload();
      } else {
        alert('Username already exist/deleted.')
      }
    });
  } else {
    alert('Please enter details.')
  }}

}
