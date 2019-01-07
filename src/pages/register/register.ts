import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { Profile } from '../../models/profile';


//import { Component } from '@angular/core';
//import { NavController } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { DashboardPage } from '../dashboard/dashboard';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  validation_messages = {
   'email': [
     { type: 'required', message: 'Email is required.' },
     { type: 'pattern', message: 'Enter a valid email.' }
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

  tryRegister(value){
    this.authService.doRegister(value)
     .then(res => {
       this.navCtrl.push(DashboardPage);
     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
     })
  }

  goLoginPage(){
    this.navCtrl.pop();
  }

}


// @IonicPage()
// @Component({
//   selector: 'page-register',
//   templateUrl: 'register.html',
// })

// export class Item{
//   body:string;
// }


// export class RegisterPage {

//   profile = {} as Profile;

//   @ViewChild('username') user;
//   @ViewChild('password') password;
  
  // arrData=[]
   //myInput

  // constructor(private alertCtrl: AlertController, private fire: AngularFireAuth, private fdb: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
  //   this.fdb.list("/users/").subscribe(_data=>{
  //     this.arrData=_data;
  //   });
  // }

  // users:FirebaseListObservable<Item[]>=null;
  // userId:string;

  // constructor(private alertCtrl: AlertController, private fire: AngularFireAuth, private fdb: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams){
  //   this.fire.authState.subscribe(user=>{
  //     if(user) this.userId=user.userId;
  //   })
  // }

  // constructor(private alertCtrl: AlertController, private afAuth:AngularFireAuth, private afDatabase: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
  // }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad RegisterPage');
  // }

  // alert(message: string) {
  //   this.alertCtrl.create({
  //     title: 'Info!',
  //     subTitle: message,
  //     buttons: ['OK']
  //   }).present();
  // }

  // registerUser() {
  //   this.fire.auth.createUserWithEmailAndPassword(this.user.value, this.password.value)
  //   .then(data => {
  //     console.log('got data ', data);
  //     this.alert('Registered!');
  //     this.fdb.list("/users/").push(this.myInput);
  //   })
  //   .catch(error => {
  //     console.log('got an error ', error);
  //     this.alert(error.message);
  //   });
  // 	console.log('Would register user with ', this.user.value, this.password.value);
  // }

//   registerUser(){
//     this.afAuth.authState.subscribe(auth =>{
//       this.afDatabase.list('profile/${auth.uid}').push(this.profile)
//       .then(()=> this.navCtrl.push('DashboardPage'))
//     })
//   }

// }
