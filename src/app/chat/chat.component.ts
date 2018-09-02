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
  channelgroupArrForChannel = [];
  channelData: any = {};
  channelCData: any = {};
  role: string;
  connection;
  connectionuser;
  groupadmin: boolean;
  superadmin: boolean
  constructor(private sockServ: SocketService, private router: Router, private http: Http) { }
  
  newRoom: string;
  newCreatedby: string;
  private apiURL = 'http://localhost:3000/api/';
  data1: any = {};
  data2: any = {};
  data3: any = {};
  data4: any = {};
  data5: any = {};
  data6: any = {};
  data7: any = {};
  data8: any = {};

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


    this.channelCData = this.http.get(this.apiURL + 'channels');
    this.channelCData.subscribe(response => {
      this.channelArr = response._body.split(',');
      for (var i = 0; i < this.channelArr.length; i += 2) {
        console.log(this.channelgroupArrForChannel.length);
        this.channelgroupArrForChannel.push({ 'name': this.channelArr[i] + ' > ' + this.channelArr[i + 1], 'room': this.channelArr[i], 'channel': this.channelArr[i + 1] });
      }
      console.log(this.channelgroupArrForChannel);
    });

    this.channelData = this.http.get(this.apiURL + 'channels');
    this.channelData.subscribe(response => {
      this.channelArr = response._body.split(',');
      for (var i = 0; i < this.channelArr.length; i += 2) {
        if (this.channelgroupArr.length == 0) {
          this.channelgroupArr.push({ 'room': this.channelArr[i], 'channel': [{ 'channel': this.channelArr[i + 1] }] });
        } else if (this.channelgroupArr.length > 0) {
          for (var k = 0; k < this.channelgroupArr.length; k++) {
            if (this.channelgroupArr[k].room == this.channelArr[i]) {
              this.channelgroupArr[k].channel.push({ 'channel': this.channelArr[i + 1] });
              break;
            } else if (k == this.channelgroupArr.length - 1){
              this.channelgroupArr.push({ 'room': this.channelArr[i], 'channel': [{ 'channel': this.channelArr[i + 1] }] });
              break;
            }
          }
        } else {
          console.log('channelgroupArr error');
        }

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
    this.data1 = this.http.get(this.apiURL + 'addroom?roomname=' +this.newRoomname);
    this.data1.subscribe(response => {
      console.log(response._body)
      console.log(typeof response._body);
      if (response._body == 'true') {
        alert('Chat room has been sucessfuly!')
        window.location.reload();
      } else {
        alert('Chat room already exist.')
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
      this.data2 = this.http.get(this.apiURL + 'addchannel?roomname=' + this.selectedGroupForChannel + '&channelname=' + this.newChannelname);
      this.data2.subscribe(response => {
        if (response._body == 'true') {
          alert('Channel has been sucessfuly created!')
          window.location.reload();
        } else {
          alert('Channel already exist.')
        }
      });
    } else {
      alert('Please enter details.')
    }
  }

  //add user to room
  selectedUser: string;
  selectedRoom: string;

  addUserToRoom(event) {
    event.preventDefault();
    if (this.selectedUser != undefined && this.selectedRoom != undefined) {
      this.data3 = this.http.get(this.apiURL + 'addusertogroup?roomname=' + this.selectedRoom + '&username=' + this.selectedUser);
      this.data3.subscribe(response => {
        console.log(response._body)
        if (response._body == 'true') {
          alert('User has been sucessfuly to add to chat room!')
          window.location.reload();
        } else {
          alert('User already exist in chat room.')
        }
      });
    } else {
      alert('Please enter details.')
    }
  }

  //add user to channel
  selectedUserForChannel: string;
  selectedUserGroupForChannel: string;
  selectedChannel: string;
  addUserToChannel(event) {
    event.preventDefault();
    if (this.selectedUserForChannel != undefined && this.selectedChannel != undefined &&  this.selectedUserGroupForChannel != undefined) {
      this.data5 = this.http.get(this.apiURL + 'addusertochannel?roomname=' + this.selectedUserGroupForChannel + '&username=' + this.selectedUserForChannel + '&channelname=' + this.selectedChannel);
      this.data5.subscribe(response => {
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
      this.data5 = this.http.get(this.apiURL + 'deleteroom?roomname=' + this.selectedGroupForDelete);
      this.data5.subscribe(response => {
        console.log(response._body)
        if (response._body == 'true') {
          alert('Chat room has been sucessfuly deleted!')
          window.location.reload();
        } else {
          alert('Error of delete chat room.')
        }
      });
    } else {
      console.log('Please enter details.');
    }
  }

  //delete channel
  selectedChannelForDelete: string;
  deleteChannel(event) {
    event.preventDefault();
    if (this.selectedChannelForDelete != undefined) {
      var arr = [];
      arr = this.selectedChannelForDelete.split(',');
      this.data6 = this.http.get(this.apiURL + 'deletechannel?roomname=' + arr[0] + '&channelname=' + arr[1]);
      this.data6.subscribe(response => {
        console.log(response._body)
        if (response._body == 'true') {
          alert('Channel has been sucessfuly deleted!')
          window.location.reload();
        } else {
          alert('Error of delete channel.')
        }
      });
    } else {
      alert('Please enter details.')
    }
  }

  //delete user from group
  selectedUserDeleteGroup: string;
  selectedGroupDeleteGroup: string;
  deleteUserFromGroup(event) {
    event.preventDefault();
    if (this.selectedUserDeleteGroup != undefined && this.selectedGroupDeleteGroup != undefined) {
      this.data3 = this.http.get(this.apiURL + 'deleteuserfromgroup?roomname=' + this.selectedGroupDeleteGroup + '&username=' + this.selectedUserDeleteGroup);
      this.data3.subscribe(response => {
        console.log(response._body)
        if (response._body == 'true') {
          alert('User has been sucessfuly from chat room!')
          window.location.reload();
        } else {
          alert('User does not exist in group')
        }
      });
    } else {
      alert('Please enter details.')
    }
  }

  //delete user from channel
  selectedUserDeleteChannel: string;
  selectedGroupDeleteChannel: string;
  selectedChannelDeleteChannel: string;
  deleteUserFromChannel(event) {
    event.preventDefault();
    if (this.selectedUserDeleteChannel != undefined && this.selectedChannelDeleteChannel != undefined && this.selectedGroupDeleteChannel != undefined) {
      this.data8 = this.http.get(this.apiURL + 'deleteuserfromchannel?roomname=' + this.selectedGroupDeleteChannel + '&username=' + this.selectedUserDeleteChannel + '&channelname=' + this.selectedChannelDeleteChannel);
      this.data8.subscribe(response => {
        console.log(response._body)
        if (response._body == 'true') {
          alert('User removed from channel!')
          window.location.reload();
        } else {
          alert('User does not exist in channel')
        }
      });
    } else {
      alert('Empty field(s)');
    }
  }
}
