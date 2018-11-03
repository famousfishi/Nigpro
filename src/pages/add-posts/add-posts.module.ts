import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPostsPage } from './add-posts';

@NgModule({
  declarations: [
    AddPostsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPostsPage),
  ],

  exports: [
    AddPostsPage
  ]
})
export class AddPostsPageModule {}
