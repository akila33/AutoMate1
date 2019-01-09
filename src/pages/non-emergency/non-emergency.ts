import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { App, MenuController, Nav, Platform } from 'ionic-angular';
import { AuthService } from '../../pages/services/auth.service';
import { DashboardPage } from '../dashboard/dashboard';
import { AddVehiclePage } from '../add-vehicle/add-vehicle';
import { AppointmentServiceProvider } from '../services/appointment-service';
import { VehicleServiceProvider } from '../services/vehicle-service';
import { ServiceCentersServiceProvider } from '../../providers/service-centers-service/service-centers-service';
import { ProblemsServiceProvider } from '../../providers/problems-service/problems-service';
import { Geolocation, PositionError, Geoposition } from '@ionic-native/geolocation';
import * as firebase from 'firebase/app';


@IonicPage()
@Component({
  selector: 'page-non-emergency',
  templateUrl: 'non-emergency.html',
})
export class NonEmergencyPage {

  private serviceCentersList;
  private menu: MenuController;

	@ViewChild(Nav) nav: Nav;

  appointment = {}
  serviceCenters :any = [];
  vehicles :any = [];
  problems :any = [];
  userId :any;
  latitute;
  longitude;

  constructor(public navCtrl: NavController, public navParams: NavParams,private appointmentServiceProvider:AppointmentServiceProvider,
    private auth: AuthService, private serviceServiceProvider:ServiceCentersServiceProvider,
    private vehicleServiceProvider:VehicleServiceProvider, private problemServiceProvider:ProblemsServiceProvider,
    private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NonEmergencyPage');
    this.loadVehicles();
    this.loadServiceCenters();
    this.loadProblems();

    // Getting current location of the device
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitute = resp.coords.latitude;
      this.longitude =resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  openPage(page) {
		this.menu.close();
		this.nav.setRoot(page.component);
  }
  

  // Apppointment creation
  createAppointment(value){ 
    let currentUser = firebase.auth().currentUser;
    let appointment = {
        "vehicleNo":value.vehicleNo,
        "centerName":value.centerName.name,
        "centerEmail":value.centerName.email,
        "date":value.date,
        "time":value.time,
        "serviceType":value.serviceType,
        "userEmail":currentUser.email,
        "userphone":value.userPhone,
        "userlocation":this.latitute+","+this.longitude,
        "centerphone":value.centerName.phno,
        "centerlocation":value.centerName.latitude+","+value.centerName.longitude,
        "isEmergency": 0
}

  this.appointmentServiceProvider.createAppointment(appointment).subscribe(
    resultData => {
      console.log(resultData);
      this.goToDashboard();
      }, errordata => {
    }
  );

  }

  // Navigating to the dashboard page
  goToDashboard(){
    this.navCtrl.setRoot(DashboardPage);
  }

  // Load vehicle list
  loadVehicles(){
    this.vehicleServiceProvider.findVehicleList().subscribe(
      resultData => {
        this.vehicles = resultData.records;
        console.log(this.vehicles);
        }, errordata => {
      }
    )  
  }

  // Load registered service center list
  loadServiceCenters(){
    this.serviceServiceProvider.findServiceList().subscribe(
      resultData => {
        this.serviceCenters = resultData.records;
        console.log(this.serviceCenters);
        }, errordata => {
      }
    )
  }

  // Load Non-emergency services list
  loadProblems(){
    this.problemServiceProvider.findProblem1List().subscribe(
      resultData => {
        this.problems = resultData.records;
       console.log(this.problems);
        }, errordata => {
      }
    )  
  }

}
