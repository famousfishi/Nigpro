import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';



/**
 * Generated class for the MyProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({})
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {
  user: any;
  loggedIn: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProfilePage');
  }

  ionViewDidEnter(){
    this.storage.ready().then(()=>{
      this.storage.get("loginInfo").then((loginInfo)=>{
        if(loginInfo != null){
          console.log("loginInfo");
          console.log(loginInfo);
          this.user = loginInfo.display_name;
          this.loggedIn = true;
          console.log(this.loggedIn);
        } else {
          console.log("User not found");
          this.user = {};
          this.loggedIn = false;
          this.navCtrl.setRoot('ProfilePage');
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
    this.navCtrl.setRoot('ProfilePage');
    this.storage.remove("loginInfo");
  }
}
