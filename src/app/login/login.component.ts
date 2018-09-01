import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  constructor(private router: Router, private form: FormsModule) { }

  ngOnInit() {
  }


  loginUser(event) {
    event.preventDefault();
    if (this.username == "Eric") {
      console.log('User: '+this.username+' is logined. Role: Super admin');
      sessionStorage.setItem('username', this.username);
      this.router.navigateByUrl('chat');
    } else if(this.username != ""){
      console.log('User: '+this.username+' is logined.');
      sessionStorage.setItem('username', this.username);
      this.router.navigateByUrl('chat')
    }else {
      console.log('wrong username');
      alert('Incorrect username');
    }
  }
}
