import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceServiceProvider } from '../services/service-service';
import { MyServicesPage } from '../my-services/my-services';

/**
 * Generated class for the AddServicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-service',
  templateUrl: 'add-service.html',
})
export class AddServicePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private serviceServiceProvider:ServiceServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddServicePage');
  }

  createService(value){
    let service = {
        "serviceCenter":value.serviceCenter,
        "serviceType":value.serviceType,
        "date":value.date,
        "time":value.time,
        "rating":value.rating,
        "extraDetails":value.extraDetails,
        "review":value.review
    }
    console.log(service);

    //pushing service results to the database
    this.serviceServiceProvider.createService(service).subscribe(      
      resultData => {
      console.log(resultData);

      //redirecting to the my-services page
      this.goToServices();
      }, errordata => {
      }
    );
  }

  //back button
  goToServices(){
    this.navCtrl.setRoot(MyServicesPage);
  }
  

}
