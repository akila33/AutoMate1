import { Injectable } from '@angular/core';
import { HttpParams} from '@angular/common/http';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from "@angular/http";
import { Observable } from "rxjs";
import { map,catchError } from "rxjs/operators"
/*
  Generated class for the VehicleServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VehicleServiceProvider {

  private vehicleListUrl: string = "http://automate33.tk/service/vehicle/read.php";
  private createVehicleUrl: string = "http://automate33.tk/service/vehicle/create.php";
  private deleteVehicleUrl: string = "http://automate33.tk/service/vehicle/delete.php";

  constructor(private http: Http) {
    console.log('Hello VehicleServiceProvider Provider');
  }

  findVehicleList() {
    // let user = {
    //     "userId":userId
    //  }

    console.log();
    return this.http.get(this.vehicleListUrl)
    .pipe(
      map(res => res.json()),
      catchError(this.handleError));
  }


  createVehicle(vehicle) {
    // console.log(employee);
      return this.http.post(this.createVehicleUrl,vehicle)
      .pipe(
        map(res => res.json()),
        catchError(this.handleError));
   }

   deleteVehicle(vehicle) {
     console.log(vehicle);
      return this.http.post(this.deleteVehicleUrl,vehicle)
      .pipe(
        map(res => res.json()),
        catchError(this.handleError));
   }

  handleError(error: Response) {
    console.log(error);
    return Observable.throw(error.json() || "server Error");
  }

}
