import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, public api: ApiProvider, public alertCtrl: AlertController) {
   
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

  
  adsInACategory(id: number){
    this.api.getAdsInCategory(id).then(data=>{
      this.items = data;
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
    }).catch(error=>{
      console.log(error);
    });
  }


  openSpecificAd(id: number, titleAd: string){
    console.log('The id is ' + id);
    this.navCtrl.push(SpecificAdPage, {"id": id, "titleAd": titleAd});
  }


}
