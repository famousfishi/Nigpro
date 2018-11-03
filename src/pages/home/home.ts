import { Component, ViewChild } from '@angular/core';
import { NavController, Content, ToastController, IonicPage } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

@IonicPage({})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;
  categories: any;
  d: any;
  

  scrollToTop() {
    this.content.scrollToTop();
  }

  constructor(public navCtrl: NavController, public api: ApiProvider, public toastCtrl: ToastController) {
    //call to the getCategories function
    this.getCategories();

 
  }

  doRefresh(refresher){
    this.api.getCategories().then(data=>{
      console.log(data);
      refresher.complete();
      this.categories = data;
      
      if(this.categories == ""){
        this.toastCtrl.create({
          message: 'Loading Products..',
          duration: 4000,
        }).present()
      }
      console.log(this.categories);
      console.log('finished refeshing...')
    });
  }


  getCategories(){
    this.api.getCategories().then(data=>{  
    
      this.categories =data;
      console.log(this.categories);

      let d: any = data;
      d.forEach((p)=>{
        p.c_title= p.c_title.replace(/&amp;/g, '&');
      })

      console.log('new data is: ')
      console.log(d);
      this.categories = d;
     
      // this.categories.forEach(function(element){
      //   element.replace( /&amp;/g, '&');
      //   console.log(element);
      // });

      
          
    }).catch(error=>{
      console.log(error);
    });
  }


  //goToAdsCategoryPage
  openAdsCategoryPage(id: number, title: string){
    console.log('The id is: ' + id);
    this.navCtrl.push('AdsInACategoryPage', {"id": id, "title": title});
  }
  

  
 

}

