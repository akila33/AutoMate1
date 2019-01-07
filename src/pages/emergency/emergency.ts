import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Nav } from 'ionic-angular';
import { MapPage } from '../map/map';
import { AlertController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { EmergencyServiceProvider } from '../services/emergency-service';
import { AuthService } from '../../pages/services/auth.service';
import { Geolocation, PositionError, Geoposition } from '@ionic-native/geolocation';

import { AppointmentServiceProvider } from '../services/appointment-service';
import { ProblemsServiceProvider } from '../../providers/problems-service/problems-service';
//import { filter } from 'rxjs/operators';
import { UpcomingServiceProvider } from '../services/upcoming-service';
import * as firebase from 'firebase/app';
/**
 * Generated class for the EmergencyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-emergency',
  templateUrl: 'emergency.html',
})
export class EmergencyPage {

  private serviceCentersList;
  private problemsList;
  private menu: MenuController;
  name;service;
  dimentions:any= [];
  @ViewChild(Nav) nav: Nav;
  isClicked:boolean = false;
  isDataLoad:boolean = false;

  problems :any = [];

  appointment;
  appointmentLoad:boolean = false;

  constructor(public navCtrl: NavController,private appointmentServiceProvider:AppointmentServiceProvider, public navParams: NavParams,
     private alertCtrl: AlertController, private geolocation: Geolocation,
     private emergencyServiceProvider:EmergencyServiceProvider,private auth: AuthService,
     private problemServiceProvider:ProblemsServiceProvider,
     private upcomingAppointmentServiceProvider:UpcomingServiceProvider) {

  //   setInterval(() => {
  //     this.loadDashboardData();
  // }, 2000);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmergencyPage');
  //  console.log(this.auth.getEmail());
      this.loadProblems();
     
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude

    

     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
     });

     var subscription = this.geolocation.watchPosition().subscribe(position => {
      if ((position as Geoposition).coords != undefined) {
        var geoposition = (position as Geoposition);
       console.log('Latitude: ' + geoposition.coords.latitude + ' - Longitude: ' + geoposition.coords.longitude);
        this.dimentions =  {
          "latitude":geoposition.coords.latitude,
          "longitude":geoposition.coords.longitude
         };
         console.log(this.dimentions);
      
       } 
    
  });

    this.isClicked = false;
    
    

    
  }

  clickService(){
    let currentDimentions = this.dimentions;

    let dimentions = {
          "latitude":currentDimentions.latitude,
          "longitude":currentDimentions.longitude,
          "service":this.service

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
onChange(){
 this.clickService();
}

presentConfirm(value) {
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
          //console.log('Buy clicked');

          this.isDataLoad = false;
          console.log(value);
          let now = new Date();
          let date = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate();
          let time =  now.getHours()+":"+now.getMinutes();
          
          let appointment ={
            "centerName": value.name,
            "date": date,
            "serviceType": this.service,
            "time":time,
            "centerEmail":value.email,
            "userEmail":this.auth.getEmail(),
            "isEmergency": 1
            }

            this.appointmentServiceProvider.createAppointment(appointment).subscribe(
              resultData => {
                this.loadLatestAppointment();
                this.loadLatestAppointmentPerTime();
             
              console.log(resultData);
          //     this.goToDashboard();
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

//   loadData(data){
//     this.isDataLoad = false;
//     console.log(data);
//     let now = new Date();
//     let date = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate();
//     let time =  now.getHours()+":"+now.getMinutes();
    
//     let appointment ={
//       "centerName": data.name,
//       "date": date,
//       "serviceType": this.service,
//       "time":time,
//       "centerEmail":data.email,
//       "userEmail":this.auth.getEmail()
//       }

//       this.appointmentServiceProvider.createAppointment(appointment).subscribe(
//         resultData => {
          
//          console.log(resultData);
//     //     this.goToDashboard();
//          }, errordata => {
//          }
      
//        );

//     this.isClicked = true;
//     this.name = data.name;
// }


closeDiv(){
  this.isClicked = false;
  this.isDataLoad = true;
}

  goToMaps(){
    this.navCtrl.push(MapPage);
  }

  
loadDashboardData(){
  console.log("poeep");
}


loadProblems(){

  this.problemServiceProvider.findProblemList().subscribe(
    resultData => {
      this.problems = resultData.records;
     console.log(this.problems);
     
      }, errordata => {
      }
  )
  }

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

  loadLatestAppointmentPerTime() {
    setInterval(() => {
     this.loadLatestAppointment();
    }, 60000);

  }
  
  


  

}
