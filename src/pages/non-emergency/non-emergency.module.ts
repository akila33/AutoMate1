import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NonEmergencyPage } from './non-emergency';

@NgModule({
  declarations: [
    NonEmergencyPage,
  ],
  imports: [
    IonicPageModule.forChild(NonEmergencyPage),
  ],
})
export class NonEmergencyPageModule {}
