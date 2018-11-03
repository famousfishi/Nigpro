import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';


/**
 * Generated class for the SpecificAdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({})
@Component({
  selector: 'page-specific-ad',
  templateUrl: 'specific-ad.html',
})
export class SpecificAdPage {
  id: number;
  items: any;
  titleAd: string;
  base_url: 'https://www.nigpro.com/nigpro/api/v1';
  @ViewChild('itemSlides') itemSlides: Slides;
  test: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider) {
  
    this.id= this.navParams.get('id');
    this.titleAd = this.navParams.get('titleAd');
    this.getSpecificAd(this.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpecificAdPage');
    // setInterval(()=>{

    //   if(this.itemSlides.getActiveIndex() ==this.itemSlides.length()-1)
    //   this.itemSlides.slideTo(0);

    //   this.itemSlides.slideNext();
    // }, 3000)
  }

  ionVieWillEnter(){
    this.id= this.navParams.get('id');
    this.titleAd = this.navParams.get('titleAd');
  }

  //chat box
  startChat(){
    this.navCtrl.push('ChatPage');
  }

  getSpecificAd(id:number){
    this.api.getSpecificAd(id).then(data=>{
      this.items = data;
      console.log(this.items);
    }).catch(error=>{
      console.log(error);
    });
  }



}
