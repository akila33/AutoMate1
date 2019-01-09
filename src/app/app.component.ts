import { Component, ViewChild } from '@angular/core';
import { App, MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { AddVehiclePage } from '../pages/add-vehicle/add-vehicle';
import { CarsPage } from '../pages/cars/cars';
import { AppointmentsPage } from '../pages/appointments/appointments';
import { ProfilePage } from '../pages/profile/profile';
//import { ServicesPage } from '../pages/services/services';
import { AuthService } from '../pages/services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

import { LoginPage } from '../pages/login/login';
import { MyServicesPage } from '../pages/my-services/my-services';
//import { InsurancePage } from '../pages/insurance/insurance';
import { AngularFireAuthModule } from 'angularfire2/auth';



@Component({
	templateUrl: 'app.html'
})
export class MyApp {
  
	pages;
	rootPage;

	private app;
	private platform;
	private menu: MenuController;

	@ViewChild(Nav) nav: Nav;

	constructor(public afAuth: AngularFireAuth, app: App, platform: Platform,
		menu: MenuController,
		private statusBar: StatusBar,
		private auth: AuthService) {
		this.menu = menu;
		this.app = app;
		this.platform = platform;
		this.initializeApp();

		// set our app's pages
		this.pages = [
			{ title: 'My Vehicles', component: AddVehiclePage, icon: 'ios-car' },
			{ title: 'My Appointments', component: AppointmentsPage, icon: 'ios-calendar' },
			{ title: 'My Services', component: MyServicesPage, icon: 'ios-construct' },
			//{ title: 'Insurance', component: InsurancePage, icon: 'ios-heart' },
			{ title: 'Profile', component: ProfilePage, icon: 'ios-person' },
		];
	}

	initializeApp() {
			this.platform.ready().then(() => {
				this.statusBar.styleDefault();
			});

			this.afAuth.authState
				.subscribe(
					user => {
						if (user) {
							this.rootPage = DashboardPage;
						} else {
							this.rootPage = LoginPage;
						}
					},
					() => {
						this.rootPage = LoginPage;
					}
				);
	}

	
	login() {
		this.menu.close();
		//this.auth.signOut();
		this.nav.setRoot(DashboardPage);
	}

	logout() {
		this.menu.close();
		this.auth.signOut();
		this.nav.setRoot(HomePage);
	}

	openPage(page) {
		this.menu.close();
		this.nav.setRoot(page.component);
	}

	
}

