import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http'
import 'rxjs/add/operator/map'
import { environment } from '../../environments/environment';

@Injectable()
export class RegisterService {

  backUrl = environment.backUrl;

  constructor(private http:Http) {}

  sendData(formData){

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('username', formData.username);
    urlSearchParams.append('email', formData.email);
    urlSearchParams.append('password', formData.password);

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/auth/register`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

}
