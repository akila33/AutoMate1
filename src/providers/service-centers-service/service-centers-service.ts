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
export class ServiceCentersServiceProvider {

  private serviceListUrl: string = "http://automate33.ml/service/serviceCenters/read.php";
  private createServiceUrl: string = "http://automate33.ml/service/serviceCenters/create.php";

  constructor(private http: Http) {
    console.log('Hello ServiceServiceProvider Provider');
  }

  findServiceList() {
    console.log("loadzServices");
    return this.http.get(this.serviceListUrl)
    .pipe(
      map(res => res.json()),
      catchError(this.handleError));
  }


  createService(service) {
    // console.log(employee);
      return this.http.post(this.createServiceUrl,service)
      .pipe(
        map(res => res.json()),
        catchError(this.handleError));
   }

  handleError(error: Response) {
    console.log(error);
    return Observable.throw(error.json() || "server Error");
  }

}
