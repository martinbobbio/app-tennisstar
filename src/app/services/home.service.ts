import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'
import 'rxjs/add/operator/map'
import { environment } from '../../environments/environment';

@Injectable()
export class HomeService {

  backUrl = environment.backUrl;

  constructor(private http:Http) {}

  getNotices(){

    return this.http.get(`${this.backUrl}/api/notice/get-notice`).map(
      (response) => response.json()
    )
  }

  getNotifications(){

    return this.http.get(`${this.backUrl}/api/notification/get-notifications`).map(
      (response) => response.json()
    )
  }

  getStats(){
    
    return this.http.get(`${this.backUrl}/api/notification/get-stats`).map(
      (response) => response.json()
    )
  }

  getNotificationsBy(action,entity,environment){

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('action', action);
    urlSearchParams.append('entity', entity);
    urlSearchParams.append('environment', environment);

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/notification/get-notifications-by`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

}
