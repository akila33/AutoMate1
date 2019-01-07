import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { App, MenuController, Nav, Platform } from 'ionic-angular';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { DashboardPage } from '../dashboard/dashboard';
import { AddVehiclePage } from '../add-vehicle/add-vehicle';
import { VehicleServiceProvider } from '../services/vehicle-service';
import { Dropdown1, Dropdown2 } from './dropdown';
/**
 * Generated class for the CarsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cars',
  templateUrl: 'cars.html',
})
export class CarsPage {

  //public brands: any[];
  //public models: any[];
  public brands: Dropdown1[];
  public models: Dropdown2[];

  public selectedModels: any[];

    public sModel: any;
    //public id:any;

  private menu: MenuController;

	//@ViewChild(Nav) nav: Nav;

  //todo = {}
  // logForm() {
  //   console.log(this.todo)

   



  // }


  // infoIdentityForm: FormGroup;
  //     title : FormControl;
  //     description : FormControl;
       constructor(private formBuilder: FormBuilder, public navCtrl: NavController,
        public navParams: NavParams,
        public nav: Nav,private vehicleServiceProvider:VehicleServiceProvider) {

          this.initializeState();
        this.initializeDistrict();


  //     this.title = new FormControl("", Validators.compose([Validators.required, Validators.minLength(5)]));
  //     this.description = new FormControl();
  //       this.infoIdentityForm = formBuilder.group({
  //         title: this.title,
  //         description: this.description
  //       });
  //       this.infoIdentityForm.valueChanges.subscribe(data=>this.todoOnDataChange(data));
  //     }
  //     todoOnDataChange(data: any): void {
  //        console.log(data);
  //     }
      // logForm(){
      //   console.log(this.infoIdentityForm.value)
       }

       initializeState(){
        this.brands = [
            {id: '1', name: 'Toyota'},
            {id: '2', name: 'Nissan'},
            {id: '3', name: 'Kia'},
            {id: '3', name: 'Suzuki'},
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
            {id: '7', name: 'Picanto', state_id: '3'}
        ];
        }

        setModelValues(sModel) {
          this.selectedModels = this.models.filter(model => model.state_id == sModel.id)
      }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarsPage');
  }

  openPage() {
		//this.menu.close();
    //this.nav.setRoot(DashboardPage);
    this.navCtrl.push(DashboardPage);
	}
  createVehicle(value){
  //  console.log("retrieved value: "+value);
       
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

goToAddVehicle(){
  this.navCtrl.setRoot(AddVehiclePage);
}


}
