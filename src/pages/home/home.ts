import { Component, ViewChild } from '@angular/core';
import { NavController, Content, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { AdsInACategoryPage } from '../ads-in-a-category/ads-in-a-category';
import { FavSubPage } from '../fav-sub/fav-sub';
import { SearchPage } from '../search/search';
import { Storage } from '@ionic/storage';

// @IonicPage({})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;
  categories: any;
  d: any;
  searchQuery: string = "";


  scrollToTop() {
    this.content.scrollToTop();
  }

  constructor(public navCtrl: NavController, public api: ApiProvider, public toastCtrl: ToastController, public storage: Storage) {
    //call to the getCategories function
    this.getCategories();

    storage.set('teststo', 'John Bosco');
    console.log("successfully saved john bosco");
    console.log("getting john bosco...");
    storage.get('teststo').then((j) => {
      console.log('John is: ' + j);
    });
  }

  doRefresh(refresher) {
    this.api.getCategories().then(data => {
      console.log(data);
      refresher.complete();
      this.categories = data;

      if (this.categories == "") {
        this.toastCtrl.create({
          message: 'Loading Products..',
          duration: 4000,
        }).present()
      }
      console.log(this.categories);


      let d: any = data;
      d.forEach((p) => {
        p.c_title = p.c_title.replace(/&amp;/g, '&');
      })

      this.categories = d;
      console.log('finished refeshing...')
    });
  }


  getCategories() {
    this.api.getCategories().then(data => {

      this.categories = data;
      console.log(this.categories);

      let d: any = data;
      d.forEach((p) => {
        p.c_title = p.c_title.replace(/&amp;/g, '&');
      })

      console.log('new data is: ')
      console.log(d);
      this.categories = d;

      // this.categories.forEach(function(element){
      //   element.replace( /&amp;/g, '&');
      //   console.log(element);
      // });



    }).catch(error => {
      console.log(error);
    });
  }


  //goToAdsCategoryPage
  openAdsCategoryPage(id: number, title: string) {
    console.log('The id is: ' + id);
    this.navCtrl.push(AdsInACategoryPage, { "id": id, "title": title });
  }


  favourites() {
    this.navCtrl.push(FavSubPage);
  }


  onSearch(event) {
    if (this.searchQuery.length > 0) {
      this.navCtrl.push(SearchPage, { "searchQuery": this.searchQuery });
    }
  }


  changeCount(event: any) {
    console.log('Printing...');
    console.log(event.target.value);
  }



}

