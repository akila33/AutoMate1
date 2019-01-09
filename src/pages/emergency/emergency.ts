import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Nav } from 'ionic-angular';
import { MapPage } from '../map/map';
import { AlertController } from 'ionic-angular';
import { EmergencyServiceProvider } from '../services/emergency-service';
import { AuthService } from '../../pages/services/auth.service';
import { Geolocation,  Geoposition } from '@ionic-native/geolocation';

import { AppointmentServiceProvider } from '../services/appointment-service';
import { ProblemsServiceProvider } from '../../providers/problems-service/problems-service';
import { UpcomingServiceProvider } from '../services/upcoming-service';
import { VehicleServiceProvider } from '../services/vehicle-service';
import * as firebase from 'firebase/app';


@IonicPage()
@Component({
  selector: 'page-emergency',
  templateUrl: 'emergency.html',
})
export class EmergencyPage {

  private serviceCentersList;
  private problemsList;
  private menu: MenuController;
  name;service;vehicleNo;
  dimentions:any= [];
  vehicles :any = [];
  problems :any = [];

  @ViewChild(Nav) nav: Nav;
  isClicked:boolean = false;
  isDataLoad:boolean = false;

  appointment;
  appointmentLoad:boolean = false;
  latitute;
  longitude;

  constructor(public navCtrl: NavController,private appointmentServiceProvider:AppointmentServiceProvider, public navParams: NavParams,
     private alertCtrl: AlertController, private geolocation: Geolocation,
     private emergencyServiceProvider:EmergencyServiceProvider,private auth: AuthService,
     private problemServiceProvider:ProblemsServiceProvider,
     private vehicleServiceProvider:VehicleServiceProvider,
     private upcomingAppointmentServiceProvider:UpcomingServiceProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmergencyPage');
    // Loading Problem list and Vehicle list
    this.loadProblems();
    this.loadVehicles();
     
    // Get the current position of the device
    this.geolocation.getCurrentPosition().then((resp) => {
        this.latitute = resp.coords.latitude;
        this.longitude =resp.coords.longitude;
        }).catch((error) => {
          console.log('Error getting location', error);
        });
        
        let watch = this.geolocation.watchPosition();
        watch.subscribe((data) => {
        });

    // Handler function that will be called automatically each time the position of the device changes
    var subscription = this.geolocation.watchPosition().subscribe(position => {
        if ((position as Geoposition).coords != undefined) {
          var geoposition = (position as Geoposition);
          console.log('Latitude: ' + geoposition.coords.latitude + ' - Longitude: ' + geoposition.coords.longitude);
          // Assigning dimensions using devices' current location
          this.dimentions =  {
            "latitude":geoposition.coords.latitude,
            "longitude":geoposition.coords.longitude
          };
          console.log(this.dimentions);
      
        } 
    
    });

    this.isClicked = false;    
  }

  // Function which loads the Service Centre list
  clickService(){
    let currentDimentions = this.dimentions;

    // Assigning parameters to find the nearest service centers
    let dimentions = {
        "latitude":currentDimentions.latitude,
        "longitude":currentDimentions.longitude,
        "service":this.service,
        "vehicleNo":this.vehicleNo
    }

    console.log(dimentions);

    this.emergencyServiceProvider.findServiceCentersList(dimentions).subscribe(
        resultData => {
          this.serviceCentersList = resultData.records;
          this.isDataLoad = true;
        console.log(this.serviceCentersList);
        }, errordata => {
        }
    );
  }

  // Calling clickService() function
  onChange(){
    this.clickService();
  }

  // Clicked REQUEST button
  // Emregency appointment creation
  presentConfirm(value) {
    let currentUser = firebase.auth().currentUser;
    let alert = this.alertCtrl.create({
      title: 'Confirm request',
      message: 'Request service?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {

            this.isDataLoad = false;
            console.log(value);
            let now = new Date();
            let date = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate();
            let time =  now.getHours()+":"+now.getMinutes();
           
            // Assign values for typescript custom object appointment
            let appointment ={
              "vehicleNo":this.vehicleNo,
              "centerName":value.name,
              "date": date,
              "serviceType":this.service,
              "time":time,
              "centerEmail":value.email,
              "userEmail":this.auth.getEmail(),
              "centerphone":value.phno,
              "userlocation":this.latitute+","+this.longitude,
              "centerlocation":value.latitude+","+value.longitude,
              "isEmergency": 1
            }

            // Creating the emergency service appointment
            this.appointmentServiceProvider.createAppointment(appointment).subscribe(
              resultData => {
                this.loadLatestAppointment();
                this.loadLatestAppointmentPerTime();
              
                console.log(resultData);
              }, errordata => {
              }
              
            );

            this.isClicked = true;
            this.name = value.name;

          }
        }
      ]
    });
    alert.present();
  }


  closeDiv(){
    this.isClicked = false;
    this.isDataLoad = true;
  }

  // Navigating to Maps Page
  goToMaps(value){
    // Setting a localstorage to parse latitude and longitude of the service centre in order to view the map
    localStorage.setItem('dimensions', JSON.stringify({ latitude: value.latitude,longitude: value.longitude }));
    this.navCtrl.push(MapPage);
  }

  // Function for loading emergency services list
  loadProblems(){
    this.problemServiceProvider.findProblemList().subscribe(
      resultData => {
        this.problems = resultData.records;
      console.log(this.problems);
      
        }, errordata => {
        }
    )
  }

  // Functions for loading user vahicle list
  loadVehicles(){
    this.vehicleServiceProvider.findVehicleList().subscribe(
      resultData => {
        this.vehicles = resultData.records;
        console.log(this.vehicles);
        }, errordata => {
        }
    )
  }

  // Function for loading the latest emergency appointment in order to check the status
  loadLatestAppointment(){
    let currentUser = firebase.auth().currentUser;
    let user = {
      "useremail":currentUser.email
    }
    this.upcomingAppointmentServiceProvider.findLatestEmergencyAppointment(user).subscribe(
          resultData => {
             this.appointment = resultData.records[0];
             this.appointmentLoad = true;
             console.log(this.appointment);
          },errorData => {

          }
    );
  }

  // Function to set the interval for component refesh
  loadLatestAppointmentPerTime() {
    setInterval(() => {
     this.loadLatestAppointment();
    }, 1000);

  }
  
}
