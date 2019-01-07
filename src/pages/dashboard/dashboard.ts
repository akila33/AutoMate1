import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { Tile } from './models/tile.model';

import { ProfilePage } from '../profile/profile';
import { CarsPage } from '../cars/cars';
import { AppointmentsPage } from '../appointments/appointments';
import { EmergencyPage } from '../emergency/emergency';
import { NonEmergencyPage } from '../non-emergency/non-emergency';
import { OurServicesPage } from '../our-services/our-services';
import { AboutPage } from '../about/about';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  public tiles: Tile[][];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public nav: Nav) {
    // this.nav.setRoot(DashboardPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  emergency() {
  	this.navCtrl.push(EmergencyPage);
  }

  nonEmergency() {
  	this.navCtrl.push(NonEmergencyPage);
  }

  ourServices(){
	this.navCtrl.push(OurServicesPage);
  }

  about(){
	this.navCtrl.push(AboutPage);
  }

  private initTiles(): void {
		this.tiles = [[{
			//title: 'Wordpress',
			//path: 'wordpress-articles',
			//icon: 'logo-wordpress',
			component: CarsPage
		}, {
			//title: 'Slides',
			//path: 'slides',
			//icon: 'swap',
			component: AppointmentsPage
		}], [{
			//title: 'Map',
			//path: 'map',
			//icon: 'map',
			component: ProfilePage
		}]];
	}

}
