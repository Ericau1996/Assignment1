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
  newRoomname: string;

  createRoom(event) {
    event.preventDefault();
    console.log(this.newRoomname);
    if (this.newRoomname != undefined && this.newRoomname.trim() != '') {
    this.data = this.http.get(this.apiURL + 'addroom?roomname=' +this.newRoomname);
    this.data.subscribe(response => {
      console.log(response._body)
      console.log(typeof response._body);
      if (response._body == 'true') {
        alert('Room has been sucessfuly!')
        window.location.reload();
      } else {
        alert('Group already exist.')
      }
    });
  } else {
    alert('Please enter details.')
  }}

  newChannelname: string;

  createChannel(event) {
    event.preventDefault();
    console.log(this.newChannelname);
    if (this.newChannelname != undefined && this.newChannelname.trim() != '') {
    this.data = this.http.get(this.apiURL + 'addchannel?channelname=' +this.newChannelname);
    this.data.subscribe(response => {
      console.log(response._body)
      console.log(typeof response._body);
      if (response._body == 'true') {
        alert('Channel has been sucessfuly!')
        window.location.reload();
      } else {
        alert('Channel already exist.')
      }
    });
  } else {
    alert('Please enter details.')
  }}

  addUserToRoom(event) {
    event.preventDefault();
    console.log(this.selectedUser);
    console.log(this.selectedRoom);
    this.data = this.http.get(this.apiURL + 'addusertogroup?room=' +this.selectedRoom + '&user=' +this.selectedUser);
    this.data.subscribe(response => {
      console.log(response._body)
      console.log(typeof response._body);
      if (response._body == 'true') {
        alert('Add user to group has been sucessfuly!')
        window.location.reload();
      } else {
        alert('Error.')
      }
    });
  }
}
