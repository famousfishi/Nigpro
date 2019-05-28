import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { ApiProvider } from '../../providers/api/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { SendPostPage } from '../send-post/send-post';


/**
 * Generated class for the AdsInACategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


// @IonicPage({})
@Component({
  selector: 'page-add-posts',
  templateUrl: 'add-posts.html',
})
export class AddPostsPage {

  amount: number;

  title: string = '';
  categoryMethod: any;
  categories: any;

  description: string = '';


  stateMethods: any[];
  state: any;

  countryMethods: any[];
  country: any;

  countryMethod: any;
  countries: any;

  imageURI: any;
  imageFileName: any;

  userId: number;
  category_id: number;

  adPackageMethod: any;
  adPackages: any;
  adPackage_id: number;

  negotiableMethods: any[];
  negotiable: any;

  street: string;
  city: string;

  zipcode: number;


  testMethod: any;


  loggedIn: boolean;
  user: any;



  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private camera: Camera,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public api: ApiProvider,
    public loadCtrl: LoadingController,
    public httpClient: HttpClient,
    public storage: Storage) {

    this.negotiableMethods = [
      { id: 1, neg_name: "Yes" },
      { id: 2, neg_name: "No" }
    ]


    this.stateMethods = [
      { state_id: 1, state_name: "Abia" },
      { state_id: 2, state_name: "Adamawa" },
      { state_id: 3, state_name: "Akwa-Ibom" },
      { state_id: 4, state_name: "Anambra" },
      { state_id: 5, state_name: "Bauchi" },
      { state_id: 6, state_name: "Bayelsa" },
      { state_id: 7, state_name: "Benue" },
      { state_id: 8, state_name: "Borno" },
      { state_id: 9, state_name: "Cross-River" },
      { state_id: 10, state_name: "Delta" },
      { state_id: 11, state_name: "Ebonyi" },
      { state_id: 12, state_name: "Edo" },
      { state_id: 13, state_name: "Ekiti" },
      { state_id: 14, state_name: "Enugu" },
      { state_id: 15, state_name: "FCT-Abuja" },
      { state_id: 16, state_name: "Gombe" },
      { state_id: 17, state_name: "Imo" },
      { state_id: 18, state_name: "Jigawa" },
      { state_id: 19, state_name: "Kaduna" },
      { state_id: 20, state_name: "Kano" },
      { state_id: 21, state_name: "Katsina" },
      { state_id: 22, state_name: "Kebbi" },
      { state_id: 23, state_name: "Kogi" },
      { state_id: 24, state_name: "Kwara" },
      { state_id: 25, state_name: "Lagos" },
      { state_id: 26, state_name: "Nasarawa" },
      { state_id: 27, state_name: "Niger" },
      { state_id: 28, state_name: "Ogun" },
      { state_id: 29, state_name: "Ondo" },
      { state_id: 30, state_name: "Osun" },
      { state_id: 31, state_name: "Oyo" },
      { state_id: 32, state_name: "Plateau" },
      { state_id: 33, state_name: "Rivers" },
      { state_id: 34, state_name: "Sokoto" },
      { state_id: 35, state_name: "Taraba" },
      { state_id: 36, state_name: "Yobe" },
      { state_id: 37, state_name: "Zamfara" },

    ]



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPostsPage');
  }

  ionViewDidEnter() {

  }

  checkPosts() {
    this.navCtrl.push(SendPostPage);
  }





  ionViewWillEnter() {

    this.storage.ready().then(() => {
      this.storage.get("loginInfo").then((loginInfo) => {
        if (loginInfo != null) {
          console.log("loginInfo");
          console.log(loginInfo);
          this.user = loginInfo.display_name;
          this.loggedIn = true;
          // this.loggedIn = true;
          // console.log(this.loggedIn);
        } else {
          // console.log("User not found");
          // this.user = {};
          this.loggedIn = false;
          // this.navCtrl.setRoot(ProfilePage);
        }
      }).catch(error => {
        console.log("unable to find login Info");
        console.error(error);
      });
    }).catch(error => {
      console.log("storage not ready");
      console.log(error);
    });


    // another opearation
    console.log('Started logging all operations....');
    this.api.getCategories().then(data => {
      console.log(data);
      this.categories = data;
      this.category_id = data['c_id'];



      let d: any = data;
      d.forEach((p) => {
        p.c_title = p.c_title.replace(/&amp;/g, '&');
      })

      console.log('new data is: ')
      console.log(d);
      this.categories = d;
    });

    this.api.getCountries().then(data => {
      console.log(data);
      this.countries = data;
    });

    this.api.getAdPackage().then(data => {
      console.log(data);
      this.adPackages = data;
      this.adPackage_id = data['ID'];
    })


  }

  getImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      targetWidth: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceType,

    }

    this.storage.get("loginInfo").then(data => {
      console.log(data);
      this.camera.getPicture(options).then((imageData) => {
        console.log('setting params for image upload...');
        this.imageFileName = "data:image/jpeg;base64," + imageData;
      }, (err) => {
        console.log(err);
        this.presentToast(err);
      });
    });
  }

  upload_image(pid) {
    var headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'multipart/form-data');
    console.log('preparing object for post upload');
    let postParams = {
      files: this.imageFileName,
      pid: pid,
      uid: this.userId
    };
    console.log('done preparing object for post upload');


    console.log('uploading image to nigpro');
    this.httpClient.post(`https://www.nigpro.com/uploader.php`, JSON.stringify(postParams), {
      headers: headers,

    })
      .subscribe(
        resp => {
          console.log('done uploading image');

          console.log(resp);
        },
        error => {
          console.log('unable to upload image');
          console.log(error);
          console.log(error.message);
          console.log(error.status);
          console.log(error.statusText);
        });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  addPost() {
    this.loadingCtrl.create({
      content: 'Please wait',
      duration: 5000
      //send to the APi
    }).present();
    this.storage.get("loginInfo").then(data => {
      console.log(data);
      if (!data) {
        this.toastCtrl.create({
          message: 'Please ensure you are logged in to make a post!!!',
          duration: 4000
        }).present();
      }
      else {

        if (this.categoryMethod == "" || this.description == "" || this.title == "" || this.adPackageMethod == "" ||
          this.negotiable == "" || this.amount == 0 || this.street == "" || this.city == "" || this.state == "" ||
          this.countryMethod == "" || this.zipcode == 0
        ) {
          this.toastCtrl.create({
            message: 'Please enter all the available fields',
            duration: 4000
          }).present();
        }

        else {
          this.storage.get("loginInfo").then(data => {
            console.log(data);
            console.log('user ID is:' + data['ID']);
            this.userId = data['ID'];

            this.api.postAnAdvert(this.userId, this.categoryMethod, this.description,
              this.title, this.adPackageMethod, this.negotiable, this.amount, this.street, this.city,
              this.state, this.countryMethod, this.zipcode)
              .then(data => {
                console.log('User ID:' + this.userId);
                console.log('Category ID: ' + this.categoryMethod);
                console.log('Description: ' + this.description);
                console.log('Title' + this.title);
                console.log('AdPackage ID:' + this.adPackageMethod);
                console.log('Negotiable' + this.negotiable);
                console.log('Amount' + this.amount);
                console.log('Street' + this.street);
                console.log('City: ' + this.city);
                console.log('State:' + this.state);
                console.log('Country: ' + this.countryMethod);
                console.log('Zipcode: ' + this.zipcode);
                console.log(data);
                let d: any = data;
                this.upload_image(d.id);

                this.storage.set("items", d);
                console.log("succssfully set item in storage.");

                this.alertCtrl.create({
                  message: 'Your post has been uploaded!!!',
                  title: 'UPLOAD STATUS',
                  buttons: [{
                    text: 'OK',
                    handler: () => {
                      this.navCtrl.parent.select(1);
                    }

                  }]
                }).present();

                //clear all the fields
                this.categoryMethod = "";
                this.description = "";
                this.title = "";
                this.adPackageMethod = "";
                this.negotiable = "";
                this.amount = null;
                this.street = "";
                this.city = "";
                this.state = "";
                this.countryMethod = "";
                this.zipcode = null;
                this.imageFileName = "";






              }).catch(error => {
                console.log(error);
              });

          });
        }

      }
    })





  }





}


