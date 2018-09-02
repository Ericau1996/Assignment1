import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket/socket.service';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  username: string;
  messages = [];
  message;
  users=[];
  user;
  userArr = [];
  userData: any = {};
  roomArr = [];
  roomData: any = {};
  role: string;
  connection;
  connectionuser;
  groupadmin: boolean;
  superadmin: boolean
  constructor(private sockServ: SocketService, private router: Router, private http: Http) { }
  
  newRoom: string;
  newCreatedby: string;
  private apiURL = 'http://localhost:3000/api/';
  data: any = {};

  selectedUser: string;
  selectedRoom: string;

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
      console.log("Session started for: " + this.username+"Role: Super admin");
      this.connection = this.sockServ.getMessages().subscribe(message => {
        this.messages.push(message);
        this.message = '';
      });
    }else if(this.role == 'superAdmin'){
      this.username = sessionStorage.getItem('username');
      console.log("Session started for: " + this.username+"Role: Super admin");
      this.connection = this.sockServ.getMessages().subscribe(message => {
        this.messages.push(message);
        this.message = '';
      });
    }else if(this.role == 'user'){
      this.username = sessionStorage.getItem('username');
      console.log("Session started for: " + this.username);
      this.connection = this.sockServ.getMessages().subscribe(message => {
        this.messages.push(message);
        this.message = '';
      });
    }else{
      console.log('Not validated');
      sessionStorage.clear();
      alert("Not a valid User");
      this.router.navigateByUrl('login');
    }
    this.userData = this.http.get(this.apiURL + 'users');
      this.userData.subscribe(response => {
        this.userArr = response._body.split(',');
    });
    this.roomData = this.http.get(this.apiURL + 'rooms');
      this.roomData.subscribe(response => {
        this.roomArr = response._body.split(',');
    });
  }

  sendMessage() {
    if (this.role == 'superAdmin') {
      this.sockServ.sendMessage(this.message + ' (Super.' + this.username + ')');
    }else if (this.role == 'groupAdmin'){
      this.sockServ.sendMessage(this.message + ' (Group.' + this.username + ')');
    }else{
      this.sockServ.sendMessage(this.message + ' (' + this.username + ')');
    }
  }
  
  ngOnDestroy() {
    if (this.connection) {
      this.connection.unsubscribe();
    }
    if (this.connectionuser) {
      this.connectionuser.unsubscribe();
    }
  }

}
