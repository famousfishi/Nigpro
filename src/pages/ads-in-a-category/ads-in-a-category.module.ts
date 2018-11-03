import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdsInACategoryPage } from './ads-in-a-category';

@NgModule({
  declarations: [
    AdsInACategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(AdsInACategoryPage),
  ],
  exports: [
    AdsInACategoryPage
  ]
})
export class AdsInACategoryPageModule {}
