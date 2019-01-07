import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OurServicesPage } from './our-services';

@NgModule({
  declarations: [
    OurServicesPage,
  ],
  imports: [
    IonicPageModule.forChild(OurServicesPage),
  ],
})
export class OurServicesPageModule {}
