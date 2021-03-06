import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google:any;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapElement;
  map:any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams) {

    }

    ionViewDidLoad() {
      this.DisplayMap();
    }

    DisplayMap() {
     let dimensions = JSON.parse(localStorage.getItem("dimensions"));
     
      const location = new google.maps.LatLng(dimensions.latitude,
        dimensions.longitude);

      const options = {
        center:location,
        zoom:17,
        //streetViewControl:false,
        mapTypeId:'hybrid'
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement,options);

      //const map = new google.maps.Map(this.mapRef.nativeElement,options);

      //this.addMarker(location,map);
    }

    // addMarker(position,map) {
    //   return new google.maps.Marker({
    //     position,
    //     map
    //   });
    // }
}
