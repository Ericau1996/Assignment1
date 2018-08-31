import { Component, OnInit } from '@angular/core';
import {SocketService} from '../services/socket/socket.service';
import {Router} from "@angular/router";
// import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser'



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent {
  username:string;
  messages=[];
  message;
  connection;
  sockServ: SocketService;

  constructor(sockServ: SocketService,private router: Router) { 
    this.sockServ = sockServ;
  }

  ngOnInit() {
    if(!sessionStorage.getItem('username')){

      console.log('Not validated');
      sessionStorage.clear();
      alert("Not a Valid User");
      this.router.navigateByUrl('login');

    }else{


      this.username = sessionStorage.getItem('username');
      console.log("Session started for: "+ this.username);
      this.connection = this.sockServ.getMessage().subscribe(message=>{
        
        this.messages.push(message);
        this.message = '';
      });
    }
  }

  sendMessage(){

    this.sockServ.sendMessage(this.message+'('+this.username+')');
  
  }

  ngOnDestroy(){

    if(this.connection){
      this.connection.unsubscribe();
    }
  }

  logout(){

    sessionStorage.clear();
    console.log('Session Cleared');
    this.router.navigateByUrl('login');

    
  }
}
