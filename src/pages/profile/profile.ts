import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { ProfileServiceProvider } from '../../providers/profile-service/profile-service';
import { Profile } from '../../models/profile';
import { DashboardPage } from '../dashboard/dashboard';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile = {} as Profile;
  fName;lName;email;password;telno;

  constructor(private alertCtrl: AlertController, private afAuth:AngularFireAuth, private afDatabase: AngularFireDatabase, 
    public navCtrl: NavController, public navParams: NavParams, private profileServiceProvider:ProfileServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  // createProfile(){
  //   this.afAuth.authState.take(1).subscribe(auth =>{
  //     this.afDatabase.object('profile/${auth.uid}').set(this.profile)
  //     .then(()=> this.navCtrl.setRoot('DashboardPage'))
  //   })
  // }

  createProfile(){
    //  console.log("retrieved value: "+value);
         
      let profile = {
          "fName":this.fName,
          "lName":this.lName,
          "email":this.email,
          "password":this.password,
          "telno":this.telno
          //"userId":2
  }
  console.log(profile);
  this.profileServiceProvider.createProfile(profile).subscribe(
    resultData => {
      
     console.log(resultData);
     //this.goToAddVehicle();
     }, errordata => {
     }
  
   );
  
  
  }

  openPage(){
    this.navCtrl.setRoot(DashboardPage);
  }

}
