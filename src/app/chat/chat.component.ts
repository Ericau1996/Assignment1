import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket/socket.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  username: string;
  messages = [];
  message;
  connection;
  constructor(private sockServ: SocketService, private router: Router) { }

  ngOnInit() {
    if (!sessionStorage.getItem('username')) {
      console.log('Not validated');
      sessionStorage.clear();
      alert("Not a valid User");
      this.router.navigateByUrl('login');
    } else {
      this.username = sessionStorage.getItem('username');
      console.log("Session started for: " + this.username);
      this.connection = this.sockServ.getMessages().subscribe(message => {
        this.messages.push(message);
        this.message = '';
      });
    }
  }
  
  sendMessage() {
    this.sockServ.sendMessage(this.message + ' (' + this.username + ')');
  }
  
  ngOnDestroy() {
    if (this.connection) {
      this.connection.unsubscribe();
    }
  }

  logout() {
    sessionStorage.clear();
    console.log('Session Cleared');
    this.router.navigateByUrl('login');
  }

}
