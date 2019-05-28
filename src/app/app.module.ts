import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';


// import {ChatComponent} from '../components/chat/chat';


import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { HTTP } from '@ionic-native/http';



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ApiProvider } from '../providers/api/api';

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { AddPostsPage } from '../pages/add-posts/add-posts';
import { FavSubPage } from '../pages/fav-sub/fav-sub';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { NotificationsPage } from '../pages/notifications/notifications';
import { AdsInACategoryPage } from '../pages/ads-in-a-category/ads-in-a-category';
import { ChatPage } from '../pages/chat/chat';

import { ProfilePage } from '../pages/profile/profile';
import { SignupPage } from '../pages/signup/signup';
import { SpecificAdPage } from '../pages/specific-ad/specific-ad';
import { SendPostPage } from '../pages/send-post/send-post';
import { SearchPage } from '../pages/search/search';
import { UnverifiedpostPage } from '../pages/unverifiedpost/unverifiedpost';





@NgModule({
  declarations: [
    MyApp,
     TabsPage,
    HomePage,
    MyProfilePage,
    FavSubPage,
    NotificationsPage,
    AddPostsPage,
    AdsInACategoryPage,
    ChatPage,

    ProfilePage,
    SignupPage,
    SpecificAdPage,
    SendPostPage,
    SearchPage,
    UnverifiedpostPage



  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
   HomePage,
    MyProfilePage,
    FavSubPage,
    NotificationsPage,
    AddPostsPage,
    AdsInACategoryPage,
    ChatPage,


    ProfilePage,
    SignupPage,
    SpecificAdPage,
    SendPostPage,
    SearchPage,
    UnverifiedpostPage


  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FileTransfer,
    ImagePicker,
    HttpClient,
    FileTransferObject,
    File,
    Camera,
    ApiProvider,
    HTTP

  ]
})
export class AppModule {}
