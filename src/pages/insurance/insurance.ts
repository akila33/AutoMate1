import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { AddInsurancePage } from '../add-insurance/add-insurance';

/**
 * Generated class for the InsurancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-insurance',
  templateUrl: 'insurance.html',
})
export class InsurancePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InsurancePage');
  }

  openPage(){
    this.navCtrl.setRoot(DashboardPage);
  }

  addInsurance(){
    this.navCtrl.push(AddInsurancePage);
  }

}
