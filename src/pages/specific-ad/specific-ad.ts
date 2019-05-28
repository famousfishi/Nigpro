import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, ToastController, AlertController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { ChatPage } from '../chat/chat';
import { Storage } from '@ionic/storage';


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
  post_author: any;
  userID: any;
  username: Object[];

  itemsAvailability: boolean;

  product_id: any;

  mydata: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public api: ApiProvider, public toastCtrl: ToastController, public storage : Storage, public alertCtrl : AlertController) {
  
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

    this.api.userChatProduct(this.id).then(data=>{
      console.log(data);
      this.mydata = data;

      this.mydata.forEach(function(element){
        console.log(element);
      });
      
    });
  }

  ionVieWillEnter(){
    this.id= this.navParams.get('id');
    this.titleAd = this.navParams.get('titleAd');

   
  }

  //chat box
  startChat(){
    this.storage.get("loginInfo").then(data=>{
      if(!data){
        this.toastCtrl.create({
          message: 'Please ensure you are signed in before chatting!',
          duration: 3000
        }).present()
      }else{
        // console.log(data);
        // console.log(data.ID);
        // this.userID = data.ID
  
        this.navCtrl.push(ChatPage, {post_author: this.post_author, username: this.username, product_id: this.product_id});
      }
      
    })
    
    //this.navCtrl.push(ChatComponent);
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

  getSpecificAd(id:number){
    this.api.getSpecificAd(id).then(data=>{
      this.items = data;
      let d :any = data;
      console.log(this.items);
      console.log('The Product ID is' + d[0]['ID']);
      this.product_id = d[0]['ID'];
      console.log('My Post Author is:' + d[0]['post_author']);
      
     console.log('The Recipient is: ' +  d[0]['user'][0]['user_nicename']);

      this.post_author = data[0]['post_author'];
     this.username =     d[0]['user'][0]['user_nicename'];


      if(this.items != null){
        this.itemsAvailability = true;
      }
       else{
         this.itemsAvailability = false;
       }
    }).catch(error=>{
      console.log(error);
    });
  }



}
