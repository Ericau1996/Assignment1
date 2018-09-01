import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule } from '@angular/forms';
import { NotfoundComponent } from './notfound/notfound.component';
import { SocketService } from './services/socket/socket.service';
import { AccountComponent } from './account/account.component';
import { HttpModule } from '@angular/http'

@NgModule({   
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    MenuComponent,
    NotfoundComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
