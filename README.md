# Hiu Lok Au (s5036225)
# Chat Room assignment
Git hub clone link: https://github.com/Ericau1996/Assignment1.git

## Development server
Step 1: `cd server` move to server file.

Step 2: `node server.js` open the server.

Step 3: Open a new terminal and also type: `ng serve` in the Assignment1 file (It will not work if run this code in server file).

Step 4: Navigate to `http://localhost:4200/`.

## About git
### The layout of git repository
This git repository layout is 'Public' which refers to this file can be downloaded by everyone. Moreover, only master origin is set in this repository because of no largest changing on this project. Furthermore, take workshop task as a reference, the server is independently saved to the server folder. Therefore, user need to set up the server before use this programme.

### The approach version control
My version control system is provided by Git. Version control system is using for tracking changes in computer files and coordinating work on those files among multiple people. In this project, it is helping me for bug tracking and task management. Based on the error message which does not happened before, I can make a contrast between the old version and the code which is typing. Moreover, Merge Conflicts is a useful function for error checking after I push and pull the local file. When Merge Conflicts is happening, I can choose which version to keep (HEAD or BRANCH) or modify the code to include what is required then remove any unwanted code to make sure the code is correct.

## About Data Structures
I created two tables for recording User and Group. This type of data is saving in the server as json files.

User: is stored in authdata.json. It is defined each user's username, email and role.

Group: is stored in groupuser.json. It is defined each group data, every group is saving the data of username, channel and user in channel.

Channel: It is part of group data and recording channel name and username inside.

## About REST API	
In this project, I used http, response from @angular/http and CORS package to cross over to the server for sending and retrieving data. The reason why using CORS package becaus of the security problem, it is helpful to transfer data from localhost:3000 to 4200. In addition, route is defined to three parts, they are User, Chatroom(Group) and Channel.

### User:
user.js(used for identify user): access through http://localhost:3000/api/users

auth.js(used for check login message): access through http://localhost:3000/api/auth
Requested variables: True,if user is exist; False, if username is not exist.

register.js(used for create a new user): access through http://localhost:3000/api/reg
Requested variables: True, if username is not exist; False, if username is exist.

### Chatroom(Group):
chatroom.js(used for identify group): access through http://localhost:3000/api/rooms

addroom.js(used for add a new chat room): access through http://localhost:3000/api/addroom
Requested variables: True, if chatroom is not exist; False, if chatroom is exist.

deleteroom.js(used for delete chat room): access through http://localhost:3000/api/deleteroom
Requested variables: True, if chatroom is exist; False, if chatroom is not exist.

addusertogroup.js(used for add user to group): access through http://localhost:3000/api/addusertogroup
Requested variables: True, if user is not exist in group; False, if user is exist in group.

deleteuserfromgroup.js(used for remove user from group): access through http://localhost:3000/api/deleteuserfromgroup
Requested variables: True, ; False, .

### Channel:
channels.js(used for identify channel in group): access through http://localhost:3000/api/channels

addchannel.js(used for add a new channel): access through http://localhost:3000/api/addchannel
Requested variables: True, if addchannel is not exist; False, if addchannel is exist.

deletechannel.js(used for delete channel): access through http://localhost:3000/api/deletechannel
Requested variables: True, if addchannel is exist; False, if addchannel is not exist.

addusertochannel.js(used for add user to channel): access through http://localhost:3000/api/addusertochannel
Requested variables: True, if user is not exist in channel of group; False, if user is exist in channel of group.

deleteuserfromchannel.js(used for remove user from channel): access through http://localhost:3000/api/deleteuserfromchannel
Requested variables: True, if user is exist in channel of group; False, if user is not exist in channel of group

## Angular Architecture
Index: the frame of user interface. Every page can use the method if I stored JS and CSS method in this page.

Menu: same as Navigation Bar which is displayed in the top of every page.

Login: user can input their username to login. The input will be checked by system. If no found, the website will alert "user not exists." If system found, the page will be redirected to login page, and this user's username and role will be set to the same browser until refresh that page.

Account: show username and role. User can manage account, such as create account or delete account, if user's role is superAdmin or groupAdmin.

Chat: every user can chat here. SuperAdmin and GroupAdmin can manage each group and channel. For example, create a chat room and channel, delete room and channel, add user to channel, or remove chat room, channel and user from channel and group.

Notfound: If user go to some page which is not created, the paths will be redirected to this page. It is shown in the "Assignment1" button in the menu bar.
