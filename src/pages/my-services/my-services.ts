import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Nav, MenuController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { AddServicePage } from '../add-service/add-service';
import { ServiceServiceProvider } from '../services/service-service';
//import { UpcomingServiceProvider } from '../services/upcoming-service';

/**
 * Generated class for the MyServicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-services',
  templateUrl: 'my-services.html',
})
export class MyServicesPage {

  //private upcomingList;
  private serviceList;
  private menu: MenuController;
  serviceCenter;serviceType;date;time;rating;
  @ViewChild(Nav) nav: Nav;
  isClicked:boolean = false;
  isDataLoad:boolean = false;
  isDataServiceLoad:boolean = false;
  isServiceClicked;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController
    ,private serviceServiceProvider:ServiceServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyServicesPage');

    this.isClicked = false;

    // this.upcomingServiceProvider.findUpcomingList().subscribe(
    //   resultData => {
    //      this.upcomingList = resultData.records;
    //      this.isDataLoad = true;
    //      this.isDataServiceLoad = true;
    //    console.log(this.upcomingList);
    //    }, errordata => {
    //    }

    //  );

    this.serviceServiceProvider.findServiceList().subscribe(
      resultData => {
         this.serviceList = resultData.records;
         this.isDataLoad = true;
         this.isDataServiceLoad = true;
       console.log(this.serviceList);
       }, errordata => {
       }

     );
  }

  goToDashboard(){
    this.navCtrl.setRoot(DashboardPage);
  }

  addService(){
    this.navCtrl.setRoot(AddServicePage);
  }

//   loadData1(data){
//     this.isDataLoad = false;
//     this.isDataServiceLoad = false;
//     console.log(data);
//     this.isClicked = true;
//     this.serviceCenter = data.serviceCenter;
//     this.serviceType = data.serviceType;
//     this.date = data.date;
//     this.time = data.time;
// }

  loadData2(data){
    this.isDataLoad = false;
    this.isDataServiceLoad = false;
    console.log(data);
    this.isServiceClicked = true;
    this.serviceCenter = data.serviceCenter;
    this.serviceType = data.serviceType;
    this.date = data.date;
    this.time = data.time;
    this.rating = data.rating;
}

closeDiv(){
  this.isClicked = false;
  this.isDataLoad = true;
  this.isServiceClicked= false;
  this.isDataServiceLoad = true;
}





  // addService() {
  //   let alert = this.alertCtrl.create({
  //     title: 'Add Service details',
  //     inputs: [
  //       {
  //         name: 'serviceCenter',
  //         placeholder: 'Service center'
  //       },
  //       {
  //         name: 'serviceType',
  //         placeholder: 'Service type',
  //         type: 'text'
  //       },
  //       {
  //         name: 'date',
  //         placeholder: 'Date',
  //         type: 'date'
  //       },
  //       {
  //         name: 'time',
  //         placeholder: 'Time',
  //         type: 'time'
  //       },
  //       {
  //         name: 'rating',
  //         placeholder: 'Rating',
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Submit',
  //         //handler: data => {
  //           //if (User.isValid(data.username, data.password)) {
  //             // logged in!
  //           //} else {
  //             // invalid login
  //             //return false;
  //           //}
  //         //}
  //       }
  //     ]
  //   });
  //   alert.present();
  // }

}
