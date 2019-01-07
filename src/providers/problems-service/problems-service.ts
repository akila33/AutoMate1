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
export class ProblemsServiceProvider {

  private problemListUrl: string = "http://automate33.ml/service/problems/read.php";
  private problem1ListUrl: string = "http://automate33.ml/service/problems/read1.php";

  constructor(private http: Http) {
    console.log('Hello ProblemsServiceProvider Provider');
  }

  findProblemList() {
    console.log("loadzServices");
    return this.http.get(this.problemListUrl)
    .pipe(
      map(res => res.json()),
      catchError(this.handleError));
  }

  findProblem1List() {
    console.log("loadzServices");
    return this.http.get(this.problem1ListUrl)
    .pipe(
      map(res => res.json()),
      catchError(this.handleError));
  }


  handleError(error: Response) {
    console.log(error);
    return Observable.throw(error.json() || "server Error");
  }

}
