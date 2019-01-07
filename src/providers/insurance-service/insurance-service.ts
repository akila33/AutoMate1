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
export class InsuranceServiceProvider {

  //private vehicleListUrl: string = "http://automate33.tk/service/vehicle/readUserVehicles.php";
  private createInsuranceUrl: string = "http://automate33.ml/service/insurance/create.php";
  //private deleteVehicleUrl: string = "http://automate33.tk/service/vehicle/delete.php";

  constructor(private http: Http) {
    console.log('Hello InsuranceServiceProvider Provider');
  }

  

  createVehicle(insurance) {
    // console.log(employee);
      return this.http.post(this.createInsuranceUrl,insurance)
      .pipe(
        map(res => res.json()),
        catchError(this.handleError));
   }

   

  handleError(error: Response) {
    console.log(error);
    return Observable.throw(error.json() || "server Error");
  }

}
