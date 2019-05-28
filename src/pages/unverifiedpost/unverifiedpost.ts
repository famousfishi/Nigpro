import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage} from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';


@Component({
  selector: 'page-unverifiedpost',
  templateUrl: 'unverifiedpost.html',
})
export class UnverifiedpostPage {
  id: number;

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

  constructor(public navCtrl: NavController, public api: ApiProvider,  public navParams: NavParams, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UnverifiedpostPage');
  }

  ionViewWillEnter() {
    this.id = this.navParams.get('id');
    console.log(this.id);
    console.log("This is my id" + this.id);

    // this.storage.get("items").then((item) => {

      // console.log("item successfully parsed.");
     // console.log(item);
    //  this.items_id = item.id;
      // if (item != null) {
      //   this.itemsLogged = true;
      // }
      // else {
      //   this.itemsLogged = false;
      // }

      this.api.unverifiedPosts(this.id).then(data => {
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

    // });
  }

}
