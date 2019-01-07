import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, Nav, MenuController, AlertController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { UpcomingServiceProvider } from '../services/upcoming-service';

/**
 * Generated class for the AppointmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-appointments',
  templateUrl: 'appointments.html',
})
export class AppointmentsPage {

  private upcomingList;
  private menu: MenuController;
  serviceCenter;serviceType;date;time;
  @ViewChild(Nav) nav: Nav;
  isClicked:boolean = false;
  isDataLoad:boolean = false;
  isDataServiceLoad:boolean = false;
  isServiceClicked;

  //feed: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, 
    private upcomingServiceProvider:UpcomingServiceProvider) {
    //this.feed = navParams.get ('feed');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppointmentsPage');

    this.isClicked = false;

    // this.serviceServiceProvider.findServiceList().subscribe(
    //   resultData => {
    //      this.appointmentList = resultData.records;
    //      this.isDataLoad = true;
    //    console.log(this.appointmentList);
    //    }, errordata => {
    //    }

    //  );


    this.upcomingServiceProvider.findUpcomingList().subscribe(
      resultData => {
         this.upcomingList = resultData.records;
         this.isDataLoad = true;
         this.isDataLoad = true;
       console.log(this.upcomingList);
       }, errordata => {
       }

     );
  }

  

  goToDashboard(){
    this.navCtrl.setRoot(DashboardPage);
  }

  loadData(data){
    this.isDataLoad = false;
    console.log(data);
    this.isClicked = true;
    this.serviceCenter = data.serviceCenter;
    this.serviceType = data.serviceType;
    this.date = data.date;
    this.time = data.time;
}

closeDiv(){
  this.isClicked = false;
  this.isDataLoad = true;
}

}
