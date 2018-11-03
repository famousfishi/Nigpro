import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {LoadingController, AlertController} from 'ionic-angular';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  baseUrl : string = 'https://www.nigpro.com/nigpro/api/v1';
  countriesUrl : any = 'https://restcountries.eu/rest/v2/all';

  constructor(public http: HttpClient,
     public loadCtrl: LoadingController,
      public alertctrl: AlertController) {
    console.log('Hello ApiProvider Provider');
  }


  async getCountries(){
    return await new Promise((resolve, reject)=>{
      this.http.get(`${this.countriesUrl}`)
      .subscribe(data=>{
        console.log('success..');
        resolve(data);
      }, error=>{
        console.log('Errors...');
        reject(error);
      })

    });
  }

  // categories
  async getCategories(){
    // this.loadCtrl.create({
    //   content: 'Please wait..',
    //   duration: 2000,
    // }).present();
    return await new Promise((resolve, reject)=>{
      this.http.get(`${this.baseUrl}/categories`)
      .subscribe(data=>{
        console.log('success..');
        resolve(data);
      }, error=>{
        console.log('Errors...');
        reject(error);
      });
    });
  }

  //ads in a Category
  async getAdsInCategory(id: number){
    this.loadCtrl.create({
      content: 'Please wait..',
      duration: 3000,
    }).present();
    return await new Promise((resolve, reject)=>{
      this.http.get(`${this.baseUrl}/posts/categories/` +id)
      .subscribe(data=>{
        console.log('success..');
        resolve(data);
      }, error=>{
        console.log('Errors...');
        reject(error);
      });
    });
  }

  //specific ad
  async getSpecificAd(id: number){
     this.loadCtrl.create({
      content: 'Please wait..',
      duration: 3000,
    }).present();
    return await new Promise((resolve, reject)=>{
      this.http.get(`${this.baseUrl}/posts/post/` +id)
      .subscribe(data=>{
        console.log('success..');
        resolve(data);
      }, error=>{
        console.log('Errors...');
        reject(error);
      });
    });
  }

  //getASpecific user
  async getUser(id: number){
    return await new Promise((resolve, reject)=>{
      this.http.get(`${this.baseUrl}/get-user` +id)
      .subscribe(data=>{
        console.log('Success..');
        resolve(data);
      }, error=>{
        console.log('Errors...');
        reject(error);
      });
    });
  }

  async getAdPackage(){
    return await new Promise((resolve, reject)=>{
      this.http.get(`${this.baseUrl}/posts/ad-packages`)
      .subscribe(data=>{
        console.log('Success...');
        resolve(data);
      }, error =>{
        console.log('Errors...');
        reject(error);
      });
    });
  }


  //posting an ADVERTISEMENT
  async postAnAdvert(
    uid: number,
    category_id: number, 
    content: string,
    title: string,
    package_id: number,
    negotiable: string, 
    price: number,
    street: string, 
    city: string,
    state: string,
    country: string, 
    zipcode: number){
    this.loadCtrl.create({
      content: 'Please wait...',
      duration: 5000
    }).present();
    return await new Promise((resolve, reject)=>{
      this.http.post(`${this.baseUrl}/posts`,{
        uid: uid, category_id: category_id, content: content, title: title, 
    package_id: package_id, negotiable: negotiable, price: price, street: street, city: city,
    state: state, country: country, zipcode: zipcode
      })
      .subscribe(data=>{
        console.log('Success...');
        resolve(data);
      }, error=>{
        reject(error);
      });
    });
  }



  //mock photo images upload
  async mockPhoto(userID: number, files){
    this.loadCtrl.create({
      content: 'Please wait...',
      duration : 3000
    }).present();
    var formData = new FormData();
    formData.append('file', files)
    return await new Promise((resolve, reject)=>{
      this.http.post(`${this.baseUrl}/mock-photo/`+ userID, {formData})
      .subscribe(data=>{
        console.log('sucesss..');
        resolve(data);
      }, error=>{
        console.log('Errors...');
        reject(error);
      });
    });
  }

  //register a user
  async registerUser(user_login: string,
     email: string, 
     password: string, 
     password_confirmation: string,
     fullName: string){
      this.loadCtrl.create({
        content: 'Please wait...',
        duration : 3000
      }).present();
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
       return await new Promise((resolve, reject)=>{
         this.http.post(`${this.baseUrl}/register`,JSON.stringify({
           user_login: user_login, email: email, password: password,
            password_confirmation: password_confirmation, fullName: fullName }),{headers 
         }).subscribe(data=>{
           console.log('Success...');
           resolve(data);
         }, error=>{
            console.log('Errors...');
            reject(error);
            console.log(error);
         });
       });
  }


  //loginUser
  async loginUser(username: string, password: string){
    this.loadCtrl.create({
      content: 'Please wait...',
      duration : 3000
    }).present();
    return await new Promise((resolve, reject)=>{
      this.http.post(`${this.baseUrl}/login`, {
        username: username, password: password
      }).subscribe(data=>{
        console.log('Success...');
        resolve(data);
        if(data == 'Your credentials does not match any of our records.'){
          console.log('Errors...and you have either an invalid email..');
        }
      }, error=>{
        console.log('Errors...');
        reject(error);
      });
    });
  }


  uploadPhoto(img) {

    console.log('upload image to server');
    // Split the base64 string in data and contentType
    var block = img.split(";");
    console.log('block');
    console.log(block);
    // Get the content type of the image
    var contentType = block[0].split(":")[1];// In this case "image/gif"
    console.log('contentType');
    console.log(contentType);
    // get the real base64 content of the file
    var realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."

    // Convert it to a blob to upload
    var blob = this.b64toBlob(realData, contentType);
    var f = new FormData();
    f.append("files", blob);
    return new Promise( (resolve, reject) => {
      this.http.post(`https://nigpro.com/nigpro/api/v1/mock-photo/277`, f)
      .subscribe(
          resp => {
              console.log(resp)
              resolve(resp)
          },
          error => {
              console.log(error)
              reject(error)
          }
      )
  } );
  }

  b64toBlob(b64Data, contentType, sliceSize=null) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
    }



}
