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
import { InsurancePage } from '../pages/insurance/insurance';
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
			//{ title: 'Home', component: HomePage, icon: 'home' },
			{ title: 'My Vehicles', component: AddVehiclePage, icon: 'ios-car' },
			{ title: 'My Appointments', component: AppointmentsPage, icon: 'ios-calendar' },
			{ title: 'My Services', component: MyServicesPage, icon: 'ios-construct' },
			{ title: 'Insurance', component: InsurancePage, icon: 'ios-heart' },
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

// @Component({
//   templateUrl: 'app.html'
// })
// export class MyApp {
//   @ViewChild(Nav) nav: Nav;

//   rootPage: any = HomePage;

//   pages: Array<{title: string, component: any}>;

//   constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
//     this.initializeApp();

//     // used for an example of ngFor and navigation
//     this.pages = [
//       { title: 'My Cars', component: CarsPage },
//       { title: 'My Appointments', component: AppointmentsPage },
//       //{ title: 'My Services', component: ServicesPage }
//     ];

//   }

//   initializeApp() {
//     this.platform.ready().then(() => {
//       // Okay, so the platform is ready and our plugins are available.
//       // Here you can do any higher level native things you might need.
//       this.statusBar.styleDefault();
//       this.splashScreen.hide();
//     });
//   }

//   openPage(page) {
//     // Reset the content nav to have just this page
//     // we wouldn't want the back button to show in this scenario
//     this.nav.setRoot(page.component);
//   }
// }
