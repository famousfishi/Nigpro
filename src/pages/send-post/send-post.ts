import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';
import { UnverifiedpostPage } from '../unverifiedpost/unverifiedpost';



@Component({
  selector: 'page-send-post',
  templateUrl: 'send-post.html',
})
export class SendPostPage {
  state: any;
  city: any;
  amount: any;
  zipcode: any;
  description: any;
  imageUri: any;

  posts: boolean;

  itemsLogged: boolean;

  items_id: any;

  user_id: any;

  my_data: any = [];

  id: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public api: ApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendPostPage');
  }

  goToMainPage(id: number){
    this.navCtrl.push(UnverifiedpostPage, {"id": id});
  }


  ionViewWillEnter() {


    /*  this.storage.get("items").then((item) => {

        console.log("item successfully parsed.");
        console.log(item);
        this.items_id = item.id;
        if (item != null) {
          this.itemsLogged = true;
        }
        else {
          this.itemsLogged = false;
        }

        this.api.unverifiedPosts(this.items_id).then(data => {
          let r: any = data;
          console.log(data);
          this.city = r.city;
          console.log(r.city);
          this.amount = r.price;
          console.log(r.price);
          this.zipcode = r.zipCode;
          console.log(r.zipCode);
          this.state = r.state
          console.log(r.state);
          this.description = r.post_content;
          console.log(r.post_content);
          this.imageUri = r.images;
          console.log(r.images)
        });

      });

  */

    this.storage.get("loginInfo").then((loginInfo) => {
      console.log(loginInfo);
      console.log(loginInfo["ID"]);
      this.user_id = loginInfo["ID"];

      this.api.getMyAds(this.user_id).then(data => {
        console.log(data);
        this.my_data = data;
        this.my_data.forEach(function (element) {
          console.log(element);
        });

      }).catch(error => {
        console.log(error);
      });
    });

  }
}
