import { Component } from '@angular/core';
import { NavController, NavParams, Tabs } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { ProfilePage } from '../profile/profile';



/**
 * Generated class for the MyProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {
  user: any;
  loggedIn: boolean;

  email: any;
  username: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public tab: Tabs) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProfilePage');
  }

  addPost(){
    // var t : Tabs = this.navCtrl.parent;
    // t.select(index);
    this.navCtrl.parent.select(2);
  }

  ionViewDidEnter(){


  }


  ionViewWillEnter(){
      this.email = this.navParams.get('email');

      this.username = this.navParams.get('username');

      this.storage.ready().then(()=>{
        this.storage.get("loginInfo").then((loginInfo)=>{
          if(loginInfo != null  && loginInfo !=""){
            console.log("loginInfo");
            console.log(loginInfo);
            this.user = loginInfo.user_login;
            this.email = loginInfo.user_email;
            this.loggedIn = true;
            console.log(this.loggedIn);
          } else {
            console.log("User not found");
            this.user = {};
            this.loggedIn = false;
            this.navCtrl.setRoot(ProfilePage);
          }
        }).catch(error => {
          console.log("unable to find login Info");
          console.error(error);
        });
      }).catch(error => {
        console.log("storage not ready");
        console.log(error);
      });
  }




  logout(){
    this.navCtrl.setRoot(ProfilePage);
    this.storage.remove("loginInfo");
  }
}
