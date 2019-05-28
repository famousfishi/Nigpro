import { Component } from '@angular/core';



import { HomePage } from '../home/home';
import { MyProfilePage } from '../my-profile/my-profile';
import { AddPostsPage } from '../add-posts/add-posts';

import { NotificationsPage } from '../notifications/notifications';


import { SendPostPage } from '../send-post/send-post';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SendPostPage;
  tab3Root = AddPostsPage;
  tab4Root = NotificationsPage;
  tab5Root = MyProfilePage;

  constructor() {

  }
}
