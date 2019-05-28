import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { ChatPage } from '../chat/chat';


@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  rid: number;
  sid: number;

  messages: any;
  users: any;
  mydata: any;
  id: any;

  user_logged: any;
  previous_messages: any;

  user_id: any;

  logged_person: boolean;

  other_person: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider, public storage: Storage, public toastCtrl: ToastController) {
    this.id= this.navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');

  }



  ionViewWillEnter(){
    this.storage.get("loginInfo").then(data=>{
      console.log(data);
      this.user_logged = data['ID'];
      console.log('LOGGED PERSON IS: ' + data['ID']);


      this.api.myUserAdLogin(this.user_logged).then(data=>{
        console.log(data);
        this.mydata = data;

        this.api.userChatProduct(this.mydata).then(data=>{
          console.log(data);
          this.users = data;
          this.user_id = data['ID'];

          if(this.user_logged == data['ID']){
            this.logged_person = true;
          }
          else{
            this.logged_person = false;
          }

          this.users.forEach(function(element){
            console.log(element);
            // this.other_person = element['ID'];
            console.log('The other person is' + element['ID']);
          });
        }).catch(error=>{
          console.log(error);
        });
      });

    });





  }




  notify(){
    this.navCtrl.push('NotificationPage');
  }


  chatMe(id: number){
    /*this.storage.get("loginInfo").then(data=>{
      console.log(data);
      this.sid = data.ID;
      console.log("The Logged in person is " + this.sid);


      this.api.getAllChats(id,this.sid)
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
    this.navCtrl.push(ChatPage, {"id": id});
  }
}
