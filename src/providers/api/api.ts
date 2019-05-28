import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ToastController } from 'ionic-angular';


/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  auth_id;
  chat_id;
  baseUrl: string = 'https://www.nigpro.com/nigpro/api/v1';
  countriesUrl: any = 'https://restcountries.eu/rest/v2/all';

  constructor(public http: HttpClient,
    public loadCtrl: LoadingController,
    public alertctrl: AlertController,
    public toastCtrl: ToastController) {
    console.log('Hello ApiProvider Provider');
  }

  set_auth_id(id: Number) {
    this.auth_id = id;
    localStorage.setItem('logged_in', this.auth_id);

  }

  get_auth_id() {
    let id: Number = this.auth_id;
    if (!id) {
      id = parseInt(localStorage.getItem("logged_in"));
    }
    return id;
  }

  set_chat_id(id: Number) {
    this.chat_id = id;
    localStorage.setItem('chat_id', this.chat_id);
  }

  get_chat_id() {
    let id: Number = this.chat_id;
    if (!id) {
      id = parseInt(localStorage.getItem('chat_id'));
    }
    return id;
  }


  async myUserAdLogin(id: number) {
    return await new Promise((resolve, reject) => {
      this.http.get(`${this.baseUrl}/posts/get-my-ads/` + id)
        .subscribe(data => {
          console.log('Sucesss...');
          resolve(data);
        }, error => {
          console.log('Errors....');
          reject(error);
        })
    })
  }

  async getCountries() {
    return await new Promise((resolve, reject) => {
      this.http.get(`${this.countriesUrl}`)
        .subscribe(data => {
          console.log('success..');
          resolve(data);
        }, error => {
          console.log('Errors...');
          reject(error);
        })

    });
  }

  // categories
  async getCategories() {
    // this.loadCtrl.create({
    //   content: 'Please wait..',
    //   duration: 2000,
    // }).present();
    return await new Promise((resolve, reject) => {
      this.http.get(`${this.baseUrl}/categories`)
        .subscribe(data => {
          console.log('success..');
          resolve(data);
        }, error => {
          console.log('Errors...');
          this.toastCtrl.create({
            message: 'Please check your internet connection / pull to refresh',
            duration: 5000
          }).present();
          reject(error);
        });
    });
  }

  //ads in a Category
  async getAdsInCategory(id: number) {

    this.loadCtrl.create({
      content: 'Please wait..',
      duration: 2000,
    }).present();
    return await new Promise((resolve, reject) => {
      this.http.get(`${this.baseUrl}/posts/categories/` + id)
        .subscribe(data => {
          console.log('success..');
          resolve(data);
        }, error => {
          console.log('Errors...');
          reject(error);
        });
    });
  }

  //specific ad
  async getSpecificAd(id: number) {
    this.loadCtrl.create({
      content: 'Please wait..',
      duration: 2000,
    }).present();
    return await new Promise((resolve, reject) => {
      this.http.get(`${this.baseUrl}/posts/post/` + id)
        .subscribe(data => {
          console.log('success..');
          resolve(data);
        }, error => {
          console.log('Errors...');
          reject(error);
        });
    });
  }

  async unverifiedPosts(id: number) {
    this.loadCtrl.create({
      content: 'Please wait..',
      duration: 3000,
    }).present();
    return await new Promise((resolve, reject) => {
      this.http.get(`${this.baseUrl}/posts/post-general/` + id)
        .subscribe(data => {
          console.log('Success');
          resolve(data);
        }, error => {
          console.log('Errors baby...');
          reject(error);
        })
    })

  }

  async getMyAds(id: number) {
    // this.loadCtrl.create({
    //   content: 'Please wait..',
    //   duration: 3000,
    // }).present();
    return await new Promise((resolve, reject) => {
      this.http.get(`${this.baseUrl}/posts/get-my-ads/` + id)
        .subscribe(data => {
          console.log('Success');
          resolve(data);
        }, error => {
          console.log('Errors baby');
          reject(error);
        })
    })
  }

  //getASpecific user
  async getUser(id: number) {
    return await new Promise((resolve, reject) => {
      this.http.get(`${this.baseUrl}/get-user/` + id)
        .subscribe(data => {
          console.log('Success..');
          resolve(data);
        }, error => {
          console.log('Errors...');
          reject(error);
        });
    });
  }

  async getAdPackage() {
    return await new Promise((resolve, reject) => {
      this.http.get(`${this.baseUrl}/posts/ad-packages`)
        .subscribe(data => {
          console.log('Success...');
          resolve(data);
        }, error => {
          console.log('Errors...');
          reject(error);



        });
    });
  }

  //all users in the system
  async getAllUsers() {
    return await new Promise((resolve, reject) => {
      this.http.get(`${this.baseUrl}/chat/users`)
        .subscribe(data => {
          console.log('Success...');
          resolve(data);
        }, error => {
          console.log('Errors...');
          reject(error);
        })
    })
  }

  //chats blablabla;
  async sendMessage(sender_id: number, recipient_id: number, message: string) {
    console.log('Sender ID is :' + sender_id);
    console.log('Recipient ID is' + recipient_id);
    console.log('Message is ' + message);
    return await new Promise((resolve, reject) => {
      this.http.post(`${this.baseUrl}/chat/store`, {
        sender_id: sender_id, recipient_id: recipient_id, message: message
      })
        .subscribe(data => {
          console.log('Success...');
          resolve(data);
        }, error => {
          reject(error);
        });
    })
  }

  //before chatting with the author of an ad
  async chatWithUser(author_id: number, initiator_id: number, product_id: number) {
    return await new Promise((resolve, reject) => {
      this.http.post(`${this.baseUrl}/chat/register-chat`, { author_id: author_id, initiator_id: initiator_id, product_id: product_id })
        .subscribe(data => {
          console.log('Success...');
          resolve(data);
        }, error => {
          console.log('Errors....');
          reject(error);
        });
    });
  }

  //get all users a a user has ever chatted with as regards a product
  async userChatProduct(id: number) {
    return await new Promise((resolve, reject) => {
      this.http.get(`${this.baseUrl}/chat/chat-users/` + id)
        .subscribe(data => {
          console.log('Success...');
          resolve(data);
        }, error => {
          console.log('Errors...');
          reject(error);
        })
    })
  }

  async getAllChats(rid: Number, sid: Number) {
    return await new Promise((resolve, reject) => {
      this.http.get(`${this.baseUrl}/chat/show/` + rid + `/` + sid)
        .subscribe(data => {
          console.log('Success');
          resolve(data);
        }, error => {
          console.log('Errors boo...');
          reject(error);
        });
    });
  }


  async getLastChats(rid: Number, sid: Number) {
    return await new Promise((resolve, reject) => {
      this.http.get(`${this.baseUrl}/chat/last/` + rid + `/` + sid)
        .subscribe(data => {
          console.log('Success');
          resolve(data);
        }, error => {
          console.log('Errors boo...');
          reject(error);
        });
    });
  }

  async registerNewUser(username: string, email: string, password: string, password_confirmation: string, fullName: string) {
    return await new Promise((resolve, reject) => {
      this.http.get(`${this.baseUrl}/register/` + username + `/` + email + `/` + password + `/` + password_confirmation + `/` + fullName)
        .subscribe(data => {
          console.log('Success');
          resolve(data);

        }, error => {
          console.log('Errors man...');
          reject(error);
        });
    });
  }


  async searchQuery(searchQuery) {
    return await new Promise((resolve, reject) => {
      this.http.get(`${this.baseUrl}/posts/search?key=` + searchQuery)
        .subscribe(data => {
          console.log('Success');
          resolve(data);
        }, error => {
          console.log('Errors boo...');
          reject(error);
        });
    })
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
    zipcode: number) {
    this.loadCtrl.create({
      content: 'Please wait...',
      duration: 5000
    }).present();
    return await new Promise((resolve, reject) => {
      this.http.post(`${this.baseUrl}/posts`, {
        uid: uid, category_id: category_id, content: content, title: title,
        package_id: package_id, negotiable: negotiable, price: price, street: street, city: city,
        state: state, country: country, zipcode: zipcode
      })
        .subscribe(data => {
          console.log('Success...');
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }



  //mock photo images upload
  async mockPhoto(userID: number, files) {
    this.loadCtrl.create({
      content: 'Please wait...',
      duration: 3000
    }).present();
    var formData = new FormData();
    formData.append('file', files)
    return await new Promise((resolve, reject) => {
      this.http.post(`${this.baseUrl}/mock-photo/` + userID, { formData })
        .subscribe(data => {
          console.log('sucesss..');
          resolve(data);
        }, error => {
          console.log('Errors...');
          reject(error);
        });
    });
  }

  //register a user
  async registerUser(username: string,
    email: string,
    password: string,
    password_confirmation: string,
    fullName: string) {
    this.loadCtrl.create({
      content: 'Please wait...',
      duration: 3000
    }).present();
    // let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return await new Promise((resolve, reject) => {
      this.http.put(`${this.baseUrl}/user-register`, {
        username: username, email: email, password: password,
        password_confirmation: password_confirmation, fullName: fullName
      }
        //,{headers}
      ).subscribe(data => {
        console.log('Success...');
        resolve(data);
      }, error => {
        console.log('Errors...');
        reject(error);
        console.log(error);
      });
    });
  }


  //loginUser
  async loginUser(username: string, password: string) {
    this.loadCtrl.create({
      content: 'Please wait...',
      duration: 3000
    }).present();
    return await new Promise((resolve, reject) => {
      this.http.post(`${this.baseUrl}/login`, {
        username: username, password: password
      }).subscribe(data => {
        console.log('Success...');
        resolve(data);
        if (data == 'Your credentials does not match any of our records.') {
          console.log('Errors...and you have either an invalid email..');
        }
      }, error => {
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
    return new Promise((resolve, reject) => {
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
    });
  }

  b64toBlob(b64Data, contentType, sliceSize = null) {
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

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }



}
