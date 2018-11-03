import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavSubPage } from './fav-sub';

@NgModule({
  declarations: [
    FavSubPage,
  ],
  imports: [
    IonicPageModule.forChild(FavSubPage),
  ],
  exports:[
    FavSubPage
  ]
})
export class FavSubPageModule {}
