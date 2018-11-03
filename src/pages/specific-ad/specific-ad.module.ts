import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpecificAdPage } from './specific-ad';

@NgModule({
  declarations: [
    SpecificAdPage,
  ],
  imports: [
    IonicPageModule.forChild(SpecificAdPage),
  ],
  exports:[
    SpecificAdPage
  ]
})
export class SpecificAdPageModule {}
