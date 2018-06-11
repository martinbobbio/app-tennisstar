import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http'
import 'rxjs/add/operator/map'
import { environment } from '../../environments/environment';

@Injectable()
export class RequestFriendService {

  backUrl = environment.backUrl;

  constructor(private http:Http) {}

  sendRequest(formData){

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id_send', localStorage.getItem("id_user"));
    urlSearchParams.append('id_receive', formData.id);

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/requestfriend/send-request-friend`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

  getRequests(){

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', localStorage.getItem("id_user"));

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/requestfriend/get-requests`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

  sendResponseFriend(id, status){
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', id);
    urlSearchParams.append('status', status);

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/requestfriend/send-response-friend`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

  getFriends(){
    
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
    
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('id', localStorage.getItem("id_user"));
    
        let body = urlSearchParams.toString();
    
        return this.http.post(`${this.backUrl}/api/requestfriend/get-friends`,body, {headers: headers}).map(
          (response) => response.json()
        )
      }

}
