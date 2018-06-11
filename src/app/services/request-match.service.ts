import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http'
import 'rxjs/add/operator/map'
import { environment } from '../../environments/environment';

@Injectable()
export class RequestMatchService {

  backUrl = environment.backUrl;

  constructor(private http:Http) {}

  sendRequest(formData){

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id_send', localStorage.getItem("id_user"));
    urlSearchParams.append('id_receive', formData.id_receive);
    urlSearchParams.append('title', formData.title);
    urlSearchParams.append('date', formData.date);
    urlSearchParams.append('hour', formData.hour);
    urlSearchParams.append('googlePlaceId', formData.googlePlaceId);

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/requestmatch/send-request-match`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

  getRequests(){

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', localStorage.getItem("id_user"));

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/requestmatch/get-matchs`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

  sendResponseMatch(id, status){
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', id);
    urlSearchParams.append('status', status);

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/requestmatch/send-response-match`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

}
