import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddInsurancePage } from './add-insurance';

@NgModule({
  declarations: [
    AddInsurancePage,
  ],
  imports: [
    IonicPageModule.forChild(AddInsurancePage),
  ],
})
export class AddInsurancePageModule {}
