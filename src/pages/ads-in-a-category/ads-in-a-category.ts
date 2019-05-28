import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { SpecificAdPage } from '../specific-ad/specific-ad';



// @IonicPage({})
@Component({
  selector: 'page-ads-in-a-category',
  templateUrl: 'ads-in-a-category.html',
})
export class AdsInACategoryPage {
  items: any;
  id: number;
  title: string;
  base_url: 'https://www.nigpro.com/nigpro/api/v1';
  product_id: any;

  itemsAvailability: boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams, public api: ApiProvider, public alertCtrl: AlertController,
     public toastCtrl : ToastController) {

    this.id = this.navParams.get('id');
    this.title = this.navParams.get('title');
    this.adsInACategory(this.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdsInACategoryPage');
    //this.id = this.navParams.get('id');
  }

  ionViewWillEnter(){
    this.id = this.navParams.get('id');
    this.title = this.navParams.get('title');
  }

  doRefresh(refresher){
    this.api.getCategories().then(data=>{
      console.log(data);
      refresher.complete();
      this.items = data;

      if(this.items == ""){
        this.toastCtrl.create({
          message: 'Loading Products..',
          duration: 4000,
        }).present()
      }
      console.log(this.items);
      console.log('finished refeshing...')
    });
  }


  adsInACategory(id: number){
    this.api.getAdsInCategory(id).then(data=>{
      this.items = data;
      this.product_id = data['ID'];
      console.log(this.items);
      if(this.items == ""){
        this.alertCtrl.create({
          title: 'NIGPRO DATA:',
          message: 'There are no products in this category',
          buttons :[{
            text: 'OK',
            handler: () =>{
              if(this.navParams.get('next')){
                this.navCtrl.push(this.navParams.get('next'));

              } else {
                this.navCtrl.pop();
              }
            }
          }]
        }).present();
      }


      // if(this.items != null){
      //   this.itemsAvailability = true;
      // }
      //  else{
      //    this.itemsAvailability = false;
      //  }
    }).catch(error=>{
      console.log(error);
    });
  }


  openSpecificAd(id: number, titleAd: string){
    console.log('The id is ' + id);
    this.navCtrl.push(SpecificAdPage, {"id": id, "titleAd": titleAd});

  }


}
