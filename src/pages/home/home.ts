import { Component, ViewChild, NgModule } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { ProfilePage } from '../profile/profile';
import { CarsPage } from '../cars/cars';
import { AppointmentsPage } from '../appointments/appointments';
import { Tile } from './tiles';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public tiles: Tile[][];

  @ViewChild('username') uname;
	@ViewChild('password') password;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }

  signInUser() {
  	this.navCtrl.push(LoginPage);
  }

  // registerUser() {
  // 	this.navCtrl.push(RegisterPage);
  // }

  createProfile(){
    this.navCtrl.push(ProfilePage);
  }

  goRegisterPage(){
    this.navCtrl.push(RegisterPage);
  }

  private initTiles(): void {
		this.tiles = [[{
			title: 'Wordpress',
			path: 'wordpress-articles',
			icon: 'logo-wordpress',
			component: CarsPage
		}, {
			title: 'Slides',
			path: 'slides',
			icon: 'swap',
			component: AppointmentsPage
		}], [{
			title: 'Map',
			path: 'map',
			icon: 'map',
			component: ProfilePage
		}]];
	}

}
