import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { DashboardPage } from '../dashboard/dashboard';
import { Events } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';

import { RegisterPage } from '../register/register';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  validations_form: FormGroup;
  errorMessage: string = '';

  validation_messages = {
   'email': [
     { type: 'required', message: 'Email is required.' },
     { type: 'pattern', message: 'Please enter a valid email.' }
   ],
   'password': [
     { type: 'required', message: 'Password is required.' },
     { type: 'minlength', message: 'Password must be at least 5 characters long.' }
   ]
 };

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ionViewWillLoad(){
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  tryLogin(value){
    this.authService.doLogin(value)
    .then(res => {
      this.navCtrl.push(DashboardPage);
    }, err => {
      this.errorMessage = err.message;
    })
  }

  goRegisterPage(){
    this.navCtrl.push(RegisterPage);
  }

}

// @IonicPage()
// @Component({
//   selector: 'page-login',
//   templateUrl: 'login.html',
// })
// export class LoginPage {

//   @ViewChild('username') user;
// 	@ViewChild('password') password;

//   constructor(events: Events, private alertCtrl: AlertController, private fire:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
//   }

//   ionViewDidLoad() {
//     console.log('ionViewDidLoad LoginPage');
//   }

//   alert(message: string) {
//     this.alertCtrl.create({
//       title: 'Info!',
//       subTitle: message,
//       buttons: ['OK']
//     }).present();
//   }


//   signInUser() {
//     this.fire.auth.signInWithEmailAndPassword(this.user.value, this.password.value)
//     .then( data => {
//       console.log('got some data', this.fire.auth.currentUser);
//       this.alert('Success! You\'re logged in');
//       //this.events.publish('user:loggedin');
//       this.navCtrl.setRoot( DashboardPage );
//       // user is logged in
//     })
//     .catch( error => {
//       console.log('got an error', error);
//       this.alert(error.message);
//     })
//   	console.log('Would sign in with ', this.user.value, this.password.value);
//   }

// }
