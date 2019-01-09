import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { RegisterPage } from '../pages/register/register';
import { EmergencyPage } from '../pages/emergency/emergency';
import { CarsPage } from '../pages/cars/cars';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { ProfilePage } from '../pages/profile/profile';
import { AppointmentsPage } from '../pages/appointments/appointments';
import { MyServicesPage } from '../pages/my-services/my-services';
//import { InsurancePage } from '../pages/insurance/insurance';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../environment/environment';

//import { ImagePicker } from '@ionic-native/image-picker';

import { FirebaseService } from '../pages/services/firebase.service';
import { AuthService } from '../pages/services/auth.service';
import { NonEmergencyPage } from '../pages/non-emergency/non-emergency';
import { AddVehiclePage } from '../pages/add-vehicle/add-vehicle';
import { AddServicePage } from '../pages/add-service/add-service';
//import { AddInsurancePage } from '../pages/add-insurance/add-insurance';
import { OurServicesPage } from '../pages/our-services/our-services';
import { AboutPage } from '../pages/about/about';

import { VehicleServiceProvider } from '../pages/services/vehicle-service';
import { ServiceServiceProvider } from '../pages/services/service-service';
import { AppointmentServiceProvider } from '../pages/services/appointment-service';
import { UpcomingServiceProvider } from '../pages/services/upcoming-service';
import { EmergencyServiceProvider } from '../pages/services/emergency-service';

import { MapPage } from '../pages/map/map';

import { Geolocation } from '@ionic-native/geolocation';

import { InsuranceServiceProvider } from '../providers/insurance-service/insurance-service';
import { ServiceCentersServiceProvider } from '../providers/service-centers-service/service-centers-service';
import { ProblemsServiceProvider } from '../providers/problems-service/problems-service';
import { ProfileServiceProvider } from '../providers/profile-service/profile-service';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DashboardPage,
    ListPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    AppointmentsPage,
    MyServicesPage,
    EmergencyPage,
    NonEmergencyPage,
    CarsPage,
    MapPage,
    AddVehiclePage,
    AddServicePage,
    OurServicesPage,
    AboutPage
  ],
  imports: [
    BrowserModule,
    IonicModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpModule,
    HttpClientModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DashboardPage,
    ListPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    AppointmentsPage,
    MyServicesPage,
    EmergencyPage,
    NonEmergencyPage,
    CarsPage,
    MapPage,
    AddVehiclePage,
    AddServicePage,
    OurServicesPage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,

    //ImagePicker,
    FirebaseService,
    AuthService,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    VehicleServiceProvider,
    ServiceServiceProvider,
    AppointmentServiceProvider,
    UpcomingServiceProvider,
    EmergencyServiceProvider,
    InsuranceServiceProvider,
    InsuranceServiceProvider,
    InsuranceServiceProvider,
    ServiceCentersServiceProvider,
    ProblemsServiceProvider,
    ProfileServiceProvider
  ]
})
export class AppModule {}
