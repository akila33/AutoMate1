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
export class UpcomingServiceProvider {

  private upcomingListUrl: string = "http://automate33.tk/service/appointment/upcomingBookings.php";
  private createUpcomingUrl: string = "http://automate33.tk/service/appointment/upcomingBookings.php";
  private appointmentUrl:string = "http://automate33.tk/service/appointment/readEmergencyAppointment.php";

  constructor(private http: Http) {
    console.log('Hello UpcomingServiceProvider Provider');
  }

  findUpcomingList() {
    console.log("loadzVehicles");
    return this.http.get(this.upcomingListUrl)
    .pipe(
      map(res => res.json()),
      catchError(this.handleError));
  }


  createUpcoming(upcoming) {
    // console.log(employee);
      return this.http.post(this.createUpcomingUrl,upcoming)
      .pipe(
        map(res => res.json()),
        catchError(this.handleError));
   }

   findLatestEmergencyAppointment(userData){
    return this.http.post(this.appointmentUrl,userData)
    .pipe(
      map(res => res.json()),
      catchError(this.handleError));
   }

  handleError(error: Response) {
    console.log(error);
    return Observable.throw(error.json() || "server Error");
  }

}
