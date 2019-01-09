import { Injectable } from '@angular/core';
import { HttpParams} from '@angular/common/http';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from "@angular/http";
import { Observable } from "rxjs";
import { map,catchError } from "rxjs/operators"

@Injectable()
export class EmergencyServiceProvider {

  private serviceCenterListUrl: string = "http://automate33.ml/service/serviceCenters/readNearastCenters.php";

  constructor(private http: Http) {
    console.log('Hello AppointmentServiceProvider Provider');
  }

  // Function to call nearest available service centre list
  findServiceCentersList(dimentions) {
    console.log("loadzVehicles");
    return this.http.post(this.serviceCenterListUrl,dimentions)
    .pipe(
      map(res => res.json()),
      catchError(this.handleError));
  }


  handleError(error: Response) {
    console.log(error);
    return Observable.throw(error.json() || "server Error");
  }

}
