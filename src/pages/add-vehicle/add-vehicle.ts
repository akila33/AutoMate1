import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, MenuController, Navbar } from 'ionic-angular';
import { CarsPage } from '../cars/cars';
import { DashboardPage } from '../dashboard/dashboard';
import { VehicleServiceProvider } from '../services/vehicle-service';

@IonicPage()
@Component({
  selector: 'page-add-vehicle',
  templateUrl: 'add-vehicle.html',
})
export class AddVehiclePage {
  private vehicleList;
  private menu: MenuController;
  vehicleNo;model;brand;manYear;
  @ViewChild(Nav) nav: Nav;
  isClicked:boolean = false;
  isDataLoad:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private vehicleServiceProvider:VehicleServiceProvider) {
  }

  ionViewDidLoad() {
    this.isClicked = false;
    // Load Vehicle List
    this.vehicleServiceProvider.findVehicleList().subscribe(
      resultData => {
         this.vehicleList = resultData.records;
         console.log(resultData);
         this.isDataLoad = true;
       console.log(this.vehicleList);
       }, errordata => {
       }

     );

  }

  // Navigates to New Vehicle form
  addVehicle(){
    this.navCtrl.push(CarsPage);
  }

  openPage() {
    this.navCtrl.setRoot(DashboardPage);
  }
  
  // Load Vehicle Details
  loadData(data){
    this.isDataLoad = false;
    console.log(data);
    this.isClicked = true;
    this.vehicleNo = data.vehicleNo;
    this.brand = data.brand;
    this.model = data.model;
    this.manYear = data.manYear;
  }

  // Remove Vehicle
  removeData(data){
    console.log(data.id);
    let id={
      "id":data.id
  }
    this.vehicleServiceProvider.deleteVehicle(id).subscribe(
      resultData => {
      this.ionViewDidLoad();
      console.log(this.vehicleList);
      }, errordata => {
      }
    );
  }

  // Back button function
  closeDiv(){
    this.isClicked = false;
    this.isDataLoad = true;
  }

}