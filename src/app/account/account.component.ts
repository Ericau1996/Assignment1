import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  accountname: string = '';
  email: string = '';
  role;
  constructor(private router: Router, private form: FormsModule) { }

  ngOnInit() {
  }


  createaccount(event) {
    event.preventDefault();
    if (this.accountname != "") {
      console.log('Account: '+this.accountname+' is created.');
      alert('Account created');
      sessionStorage.setItem('accountname', this.accountname);
      this.router.navigateByUrl('login');
    } else {
      console.log('wrong accountname');
      alert('Incorrect accountname');
    }
  }
}
