import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { MyProfilePage } from '../my-profile/my-profile';
import { SignupPage } from '../signup/signup';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  username: string = "";
  password: string = "";
  user: any;
  loggedIn: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
    public api: ApiProvider, public toastCtrl: ToastController, public storage: Storage, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  


  login(){
    this.loadingCtrl.create({
      content: 'Please wait...', 
      duration: 4000
    }).present();

    //subscribe to the login API
    this.api.loginUser(this.username, this.password).then(data=>{
      console.log(data);
        let r: any = data;
        //console.log(r.message);

        //set the storage here
        this.storage.set('loginInfo', r).then(data=>{
      
        console.log(data);
        if(data == 'Your credentials does not match any of our records.'){
          this.toastCtrl.create({
            message: 'Invalid email or password!',
            duration: 5000
          }).present();
          console.log('Errors...and you have either an invalid email..');
        } else {
          this.alertCtrl.create({
            title: 'Login Successfull',
            message: 'You have been logged in successfully',
            buttons :[{
              text: 'OK',
              handler: () =>{
        

               this.navCtrl.setRoot(MyProfilePage);
              }
            }]
          }).present();
        }
      })
    }).catch(error=>{
      this.toastCtrl.create({
        message: 'You need a good internet connection...',
        duration: 5000
      }).present();
      console.log(error);
    });
  }

  signUp(){
    this.navCtrl.push(SignupPage);
  }
}
