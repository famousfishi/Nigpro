import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';



// @IonicPage({})
@Component({
  selector: 'page-fav-sub',
  templateUrl: 'fav-sub.html',
})
export class FavSubPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavSubPage');
  }
  
  subscription(){
    this.navCtrl.push('SubscriptionPage');
  }
}
