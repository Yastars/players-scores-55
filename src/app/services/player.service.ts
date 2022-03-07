import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders, } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root"
})
export class PlayerService {
  constructor(private http: HttpClient) { }

  getPlayersScoresApi(): Observable<any> {
    let params: HttpParams = new HttpParams(), headers: HttpHeaders = new HttpHeaders();
    
    return this.http
      .get(`${environment.api_url}/demo/api.json`, { params, headers })
      .pipe(catchError(error => {
        console.log('Error Found')
        throw new Error(error)
      }));
  }
}
