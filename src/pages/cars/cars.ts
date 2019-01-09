import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { App, MenuController, Nav, Platform } from 'ionic-angular';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { DashboardPage } from '../dashboard/dashboard';
import { AddVehiclePage } from '../add-vehicle/add-vehicle';
import { VehicleServiceProvider } from '../services/vehicle-service';
import { Dropdown1, Dropdown2 } from './dropdown';

@IonicPage()
@Component({
  selector: 'page-cars',
  templateUrl: 'cars.html',
})
export class CarsPage {

  public brands: Dropdown1[];
  public models: Dropdown2[];
  public selectedModels: any[];
  
  public sModel: any;
  private menu: MenuController;

  constructor(private formBuilder: FormBuilder, public navCtrl: NavController,
    public navParams: NavParams,
    public nav: Nav,private vehicleServiceProvider:VehicleServiceProvider) {

      this.initializeState();
      this.initializeDistrict();

    }

       initializeState(){
        this.brands = [
            {id: '1', name: 'Toyota'},
            {id: '2', name: 'Nissan'},
            {id: '3', name: 'Kia'},
            {id: '4', name: 'Suzuki'},
            {id: '3', name: 'Mitsubishi'},
            {id: '3', name: 'Mazda'},
            {id: '3', name: 'Benz'},
            {id: '3', name: 'Audi'},
            {id: '3', name: 'BMW'},
            {id: '3', name: 'Subaru'},
            {id: '3', name: 'TATA'}
        ];
        }
    
        initializeDistrict(){
        this.models = [
            {id: '1', name: 'Prius', state_id: '1'},
            {id: '2', name: 'Corolla', state_id: '1'},
            {id: '3', name: 'X-Trail', state_id: '2'},
            {id: '4', name: 'March', state_id: '2'},
            {id: '5', name: 'Sorento', state_id: '3'},
            {id: '7', name: 'Picanto', state_id: '3'},
            {id: '8', name: 'Alto', state_id: '4'},
            {id: '9', name: 'Swift', state_id: '4'},
        ];
        }

        setModelValues(sModel) {
          this.selectedModels = this.models.filter(model => model.state_id == sModel.id)
      }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarsPage');
  }

  openPage() {
    this.navCtrl.push(DashboardPage);
  }
  
  // Vehicle creation with custom object vehicle
  createVehicle(value){
    let vehicle = {
        "vehicleNo":value.number,
        "brand":value.brand.name,
        "model":value.model.name,
        "manYear":value.manYear,
        "engCapacity":value.engCapacity,
        "userId":1
    }
    console.log(vehicle);
    this.vehicleServiceProvider.createVehicle(vehicle).subscribe(
      resultData => {
        
      console.log(resultData);
      this.goToAddVehicle();
      }, errordata => {
      }

    );

  }

  // Navigates to Add Vehicle Page
  goToAddVehicle(){
    this.navCtrl.setRoot(AddVehiclePage);
  }


}
