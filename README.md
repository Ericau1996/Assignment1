# Chat Room assignment

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.

## Development server

Step 1: `cd server` move to server file.

Step 2: `node server.js` open the server.

Step 3: Open a new terminal and also type: `ng serve` in the Assignment1 file (It will not work if run this code in server file).

Step 4: Navigate to `http://localhost:4200/`.

## About git

### The layout of git repository
This git repository layout is 'Public' which refers to this file can be downloaded by everyone. Moreover, only master origin is set in this repository because of no largest changing on this project. Furthermore, take workshop task as a reference, the server is independently saved to the server folder. Therefore, user need to set up the server before use this programme.

### The approach version control
My version control system is provided by Git. Verison control system is using for tracking changes in computer files and coordinating work on those files among multiple people. In this project, it is helping me for bug tracking and task management. Based on the error message which does not happened before, I can make a contrast between the old version and the code which is typing. Moreover, Merge Conflicts is a useful function for error checking after I push and pull the local file. When Merge Conflicts is happenning, I can chose which version to keep (HEAD or BRANCH) or modify the code to include what is required then remove any unwanted code to make sure the code is correct.

## About Data Structures

I created two tables for recording User and Group. This type of data are saving in the server as json files.

User: is stored in authdata.json. It is defined each user's username, email and role.

Group: is stored in groupuser.json. It is defined each group data, every group is saving the data of username, channel and user in channel.

Channel: It is part of group data and recording channel name and username inside.

## About REST API	



## Angular Architecture



### Components




### Services




### Models
Modules is an indispensable part of my project. This is because it helps my to define the structure of the data, every Angular groups related code together into Modules. For example, 'HttpModule', 'AccountComponent', 'SocketService', 'AppComponent' and 'BrowserModule' etc. This type of components, services, and models are defined and grouped clearly in Modules. 'AppModule' is the most importand part of Module which represents the entire application.
