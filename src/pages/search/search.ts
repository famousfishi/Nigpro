import { Component } from '@angular/core';
import {  NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { SpecificAdPage } from '../specific-ad/specific-ad';


@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  searchQuery: string = "";
  items: any;
  products: any[]= [];
  d: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadCtrl: LoadingController,
    public api: ApiProvider, public alertCtrl: AlertController) {
    console.log(this.navParams.get("searchQuery"));
    this.searchQuery = this.navParams.get("searchQuery");

    console.log("Searching...");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  openSpecificAd(id: number, titleAd: string){
    console.log('The id is ' + id);
    this.navCtrl.push(SpecificAdPage, {"id": id, "titleAd": titleAd});
  }

  ionViewWillEnter(){
    this.loadCtrl.create({
      content: 'Please wait..',
      duration: 3000
    });
    console.log("searched products are: ");
    this.api.searchQuery(this.searchQuery).then(data=>{
      console.log(data);

      this.items = data;
      // if(data['images']== ""){

      // }
      if(this.items == ""){
        this.alertCtrl.create({
          title: 'NIGPRO DATA:',
          message: 'No results returned!',
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

      this.items.forEach(function(element){
        console.log(element);
      });





    }).catch(error=>{
      console.log(error);
    })
  }
}
