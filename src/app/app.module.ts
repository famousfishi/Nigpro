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

import { PusherProvider } from '../providers/pusher/pusher';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { AddPostsPage } from '../pages/add-posts/add-posts';
import { FavSubPage } from '../pages/fav-sub/fav-sub';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { NotificationsPage } from '../pages/notifications/notifications';
import { AdsInACategoryPage } from '../pages/ads-in-a-category/ads-in-a-category';
import { ChatPage } from '../pages/chat/chat';
import { ChatComponent } from '../components/chat/chat';
import { NotificationPage } from '../pages/notification/notification';
import { ProfilePage } from '../pages/profile/profile';
import { SignupPage } from '../pages/signup/signup';
import { SpecificAdPage } from '../pages/specific-ad/specific-ad';
import { SubscriptionPage } from '../pages/subscription/subscription';




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
    ChatComponent,
    NotificationPage,
    ProfilePage,
    SignupPage,
    SpecificAdPage,
    SubscriptionPage
    
    
    
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
    ChatComponent,
    NotificationPage,
    ProfilePage,
    SignupPage,
    SpecificAdPage,
    SubscriptionPage
  
   
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
    PusherProvider,
    HTTP
    
  ]
})
export class AppModule {}
