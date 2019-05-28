import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';

import { MyProfilePage } from '../my-profile/my-profile';


/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  user_login: string = '';
  email: string = '';
  password: string = '';
  password_confirmation: string = '';
  fullName: string = '';


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController, public api: ApiProvider,
    public storage: Storage,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }


  register() {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    console.log("Attempting to sign up");
    this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 3000
    }).present();

    if (this.user_login === "" || this.email === "" ||
      this.password === "" || this.password_confirmation === "" || this.fullName === "") {
      this.toastCtrl.create({
        message: 'All fields are required',
        showCloseButton: true
      }).present();
      return false;
    } else if (this.password.length < 6 || this.password_confirmation.length < 6) {
      this.toastCtrl.create({
        message: 'Your password must be more than 6 characters',
        showCloseButton: true
      }).present();
      return false;
    } else if (!reg.test(this.email)) {
      this.toastCtrl.create({
        message: 'Please ensure your email is valid',
        showCloseButton: true
      }).present();
      return reg.test(String(this.email));
    } else if (this.password != this.password_confirmation) {
      this.toastCtrl.create({
        message: 'Password mismatch!! Ensure the password is same',
        // showCloseButton: true,
        duration: 5000

      }).present();
      return false;
    } else {
      //make a call to the service and register the goddamn user
      this.api.registerUser(this.user_login, this.email,
        this.password, this.password_confirmation, this.fullName).then(data => {
          console.log(data);
          let r: any = data;


          //set the storage here
          this.storage.set('loginInfo', r).then(data => {
            console.log(data);
            if (r.user_login != "") {
              this.alertCtrl.create({
                title: 'Signup successful',
                message: 'You have registered successfully!!!',
                buttons: [{
                  text: 'OK',
                  handler: () => {

                    this.navCtrl.setRoot(MyProfilePage);
                  }
                }]
              }).present();
            } else {
              this.toastCtrl.create({
                message: 'Error in signing up...Try again',
                duration: 5000
              }).present();
            }

          });
        }).catch(error => {
          this.toastCtrl.create({
            message: 'Server Error, please try again later!',

            duration: 5000

          }).present();
          console.log(error);
        });
    }


  }

}
