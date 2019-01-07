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
export class EmergencyServiceProvider {

  private serviceCenterListUrl: string = "http://automate33.tk/service/serviceCenters/readNearastCenters.php";

  constructor(private http: Http) {
    console.log('Hello AppointmentServiceProvider Provider');
  }

  findServiceCentersList(dimentions) {
    console.log("loadzVehicles");
    return this.http.post(this.serviceCenterListUrl,dimentions)
    .pipe(
      map(res => res.json()),
      catchError(this.handleError));
  }


//   createAppointment(appointment) {
//     // console.log(employee);
//       return this.http.post(this.createAppointmentUrl,appointment)
//       .pipe(
//         map(res => res.json()),
//         catchError(this.handleError));
//    }

  handleError(error: Response) {
    console.log(error);
    return Observable.throw(error.json() || "server Error");
  }

}
