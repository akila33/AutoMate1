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
export class AppointmentServiceProvider {

  private appointmentListUrl: string = "http://automate33.tk/service/appointment/read.php";
  private createAppointmentUrl: string = "http://automate33.tk/service/appointment/create.php";
  private appointmentUrl:string = "http://automate33.tk/service/appointment/readEmergencyAppointment.php";

  constructor(private http: Http) {
    console.log('Hello AppointmentServiceProvider Provider');
  }

  findAppointmentList() {
    console.log("loadzVehicles");
    return this.http.get(this.appointmentListUrl)
    .pipe(
      map(res => res.json()),
      catchError(this.handleError));
  }


  createAppointment(appointment) {
     console.log(appointment);
      return this.http.post(this.createAppointmentUrl,appointment)
      .pipe(
        map(res => res.json()),
        catchError(this.handleError));
   }

   findLatestEmergencyAppointment(userData){
    return this.http.post(this.appointmentUrl,userData)
    .pipe(
      map(res => {res.json();
        console.log(res);
      }),
      catchError(this.handleError));
   }

  handleError(error: Response) {
    console.log(error);
    return Observable.throw(error.json() || "server Error");
  }

}
