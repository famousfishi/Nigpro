import { Component } from '@angular/core';


import { HomePage } from '../home/home';
import { MyProfilePage } from '../my-profile/my-profile';
import { AddPostsPage } from '../add-posts/add-posts';
import { FavSubPage } from '../fav-sub/fav-sub';
import { NotificationsPage } from '../notifications/notifications';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = FavSubPage;
  tab3Root = AddPostsPage;
  tab4Root = NotificationsPage;
  tab5Root = MyProfilePage;

  constructor() {

  }
}
