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
  channelArr = [];
  channelgroupArr = [];
  channelData: any = {};
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
    this.channelData = this.http.get(this.apiURL + 'channels');
      this.channelData.subscribe(response => {
        this.channelArr = response._body.split(',');
        for (var i = 0; i < this.channelArr.length; i += 2) {
          console.log(this.channelgroupArr.length);
          this.channelgroupArr.push({ 'name': this.channelArr[i] + ' > ' + this.channelArr[i + 1], 'room': this.channelArr[i], 'channel': this.channelArr[i + 1] });
        }
        console.log(this.channelgroupArr);
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

  
  //create channel to group
  selectedGroupForChannel: string;
  newChannelname: string;
  createChannel(event) {
    event.preventDefault();
    if (this.selectedGroupForChannel != undefined && this.newChannelname != undefined && this.newChannelname.trim() != '') {
      this.data = this.http.get(this.apiURL + 'addchannel?roomname=' + this.selectedGroupForChannel + '&channelname=' + this.newChannelname);
      this.data.subscribe(response => {
        if (response._body == 'true') {
          alert('Channel has been sucessfuly created!')
          window.location.reload();
        } else {
          alert('Error, Channel already exist.')
        }
      });
    } else {
      alert('Field is empty')
    }
  }

  //add user to room
  selectedUser: string;
  selectedRoom: string;

  addUserToRoom(event) {
    event.preventDefault();
    if (this.selectedUser != undefined && this.selectedRoom != undefined) {
      this.data = this.http.get(this.apiURL + 'addusertogroup?roomname=' + this.selectedRoom + '&username=' + this.selectedUser);
      this.data.subscribe(response => {
        console.log(response._body)
        if (response._body == 'true') {
          alert('User added to group!')
          window.location.reload();
        } else {
          alert('User already exist in group')
        }
      });
    } else {
      alert('Empty field(s)')
    }
  }

  //add user to channel
  selectedUserForChannel: string;
  selectedChannel: string;
  addUserToChannel(event) {
    event.preventDefault();
    if (this.selectedUserForChannel != undefined && this.selectedChannel != undefined) {
      var arr = [];
      arr = this.selectedChannel.split(',');
      this.data = this.http.get(this.apiURL + 'addusertochannel?roomname=' + arr[0] + '&username=' + this.selectedUserForChannel + '&channelname=' + arr[1]);
      this.data.subscribe(response => {
        console.log(response._body)
        if (response._body == 'true') {
          alert('User added to channel!')
          window.location.reload();
        } else {
          alert('User already exist in channel')
        }
      });
    } else {
      alert('Empty field(s)');
    }
  }
  // delete group
  selectedGroupForDelete: string;
  deleteRoom(event) {
    event.preventDefault();
    console.log(this.selectedGroupForDelete);
    if (this.selectedGroupForDelete != undefined) {
      this.data = this.http.get(this.apiURL + 'deleteroom?roomname=' + this.selectedGroupForDelete);
      this.data.subscribe(response => {
        console.log(response._body)
        if (response._body == 'true') {
          alert('Group has been sucessfuly deleted!')
          window.location.reload();
        } else {
          alert('An error has occured')
        }
      });
    } else {
      console.log('Group is not selected');
    }
  }

  //delete channel
  selectedChannelForDelete: string;
  deleteChannel(event) {
    event.preventDefault();
    if (this.selectedChannelForDelete != undefined) {
      var arr = [];
      arr = this.selectedChannelForDelete.split(',');
      this.data = this.http.get(this.apiURL + 'deletechannel?roomname=' + arr[0] + '&channelname=' + arr[1]);
      this.data.subscribe(response => {
        console.log(response._body)
        if (response._body == 'true') {
          alert('Channel has been sucessfuly deleted!')
          window.location.reload();
        } else {
          alert('An error has occured')
        }
      });
    } else {
      alert('Channel is not selected')
    }
  }
}
