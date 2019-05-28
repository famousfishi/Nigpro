import { Component } from '@angular/core';
import { ApiProvider } from '../../providers/api/api';
import {Storage} from '@ionic/storage';
import { NavParams, ToastController } from 'ionic-angular';


@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  
  post_author: any;
  recipient: any;
  previous_messages: any;
  sid: any;
  rid: any;
  message: any;
  myData : any;
  me: any;
  r_nicename: any;
  the_recipient: any;
  product_id: any;
  id: any;
  


  constructor(public api: ApiProvider, 
    public storage: Storage,
     public navParams: NavParams,
      public toastCtrl: ToastController) {
        }


  ionViewDidLoad(){
    console.log('ionViewDidLoad ChatPage');
    let vm = this;
    setTimeout(function() {
      vm.loadPreviousSession(this.rid, this.sid);
    }, 500);
  }

ionViewWillEnter(){
  this.post_author = this.navParams.get('post_author');
  this.the_recipient = this.navParams.get('username');
  this.product_id = this.navParams.get('product_id');

  this.id = this.navParams.get('id');

 

  //this.sid = this.api.get_auth_id();
  //this.rid = this.api.get_chat_id();

  this.rid = this.post_author;
  console.log("The new Recipient is:" + this.rid);
  console.log('the new recipient ID from Notification' + this.id);
  //this.get_recipient(this.post_author);
  this.loadPreviousSession(this.sid, this.rid);


  /* this.storage.get("loginInfo").then(data=>{
      console.log(data);
      this.sid = data.ID;
      console.log("The Logged in person is " + this.sid);
    
  
      this.api.getAllChats(this.id,this.sid)
      .then(data => {
        this.previous_messages = data;
      })
      .catch(error => {
        this.toastCtrl.create({
          message: 'Unable to load previous session',
          duration: 3000,
          position: 'bottom'
        }).present();
        console.log(error);
      });
    })*/

  

  
}

// get_recipient(post_author: number)
//   {
//     //this.post_author = id;
//     this.api.getUser(post_author)
//     .then(data => {
//       this.recipient = data;
//       // this.r_nicename  = data[0]['user_nicename'];
//       console.log('recipient data');
//       console.log(this.recipient);
      
//     })
//     .catch(error => {
//       this.toastCtrl.create({
//         message: 'Unable to get recipient identity',
//         duration: 3000,
        
//       }).present();
//       console.log(error);
//     })
//   }



  loadPreviousSession(rid:Number, sid: Number)
  {
    this.storage.get("loginInfo").then(data=>{
      console.log(data);
      this.sid = data.ID;
      console.log("The Logged in person is " + this.sid);
      this.me = data.user_nicename;
  
      this.api.getAllChats(this.rid,this.sid)
      .then(data => {
        this.previous_messages = data;
      })
      .catch(error => {
        this.toastCtrl.create({
          message: 'Unable to load previous session',
          duration: 3000,
          position: 'bottom'
        }).present();
        console.log(error);
      });
    })
   
  }



  sendChat(e)
  {
    console.log(e);
    if(e.keyCode == 13)
    {
      if(!this.message || this.message == '')
      {
        this.toastCtrl.create({
          message: 'Please type a message to continue...',
          duration: 3000,
          position: 'bottom'
        }).present();
      }
      else
      {
       this.api.chatWithUser(this.rid, this.sid, this.product_id).then(data=>{
         console.log(data);
       });


        this.api.sendMessage(this.sid, this.rid, this.message)
        .then(data => {
          let r:any = data;
          if(r == 'ok')
          {
            this.loadPreviousSession(this.sid, this.rid);
          }
          else
          {
            this.toastCtrl.create({
              message: 'Unable to post message...',
              duration: 3000,
              
            }).present();
          }
        })
      }
    }
  }

  // This method adds classes to the element based on the message type


  getClasses(messageType) {

    if(messageType == this.sid)
    {
      return 'outgoing';
    }
    else
    {
      return 'incoming';
    }
  
  }

}

