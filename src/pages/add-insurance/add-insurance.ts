import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { App, MenuController, Nav, Platform } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { InsurancePage } from '../insurance/insurance';
import { InsuranceServiceProvider } from '../../providers/insurance-service/insurance-service';
//import { InsuranceServiceProvider } from '../services/appointment-service';

/**
 * Generated class for the NonEmergencyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-insurance',
  templateUrl: 'add-insurance.html',
})
export class AddInsurancePage {

  private menu: MenuController;

	@ViewChild(Nav) nav: Nav;

  insurance = {}


  constructor(public navCtrl: NavController, public navParams: NavParams,private insuranceServiceProvider:InsuranceServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NonEmergencyPage');
  }

  // public event = {
  //   month: '2018-02-19',
  //   timmeStarts: '07:46',
  //   timeEnds: '07:54'
  // }

  openPage(page) {
		this.menu.close();
		this.nav.setRoot(page.component);
  }
  

  createInsurance(value){ 
    console.log(value);      
    let insurance = {
        "vehicleNo":value.vehicleNo,
        "company":value.company,
        "date":value.date,
        "type":value.type
}
console.log(insurance);
this.insuranceServiceProvider.createVehicle(insurance).subscribe(
  resultData => {
    
   console.log(resultData);
   this.goToInsurance();
   }, errordata => {
   }

 );
 

}

goToDashboard(){
  this.navCtrl.setRoot(DashboardPage);
}

goToInsurance(){
  this.navCtrl.setRoot(InsurancePage);
}

}
