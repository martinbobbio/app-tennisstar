import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams  } from '@angular/http'
import 'rxjs/add/operator/map'
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  backUrl = environment.backUrl;

  constructor(private http:Http) {}

  sendProfileData(formData){
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', localStorage.getItem("id_user"));
    urlSearchParams.append('firstname', formData.firstname);
    urlSearchParams.append('lastname', formData.lastname);
    urlSearchParams.append('age', formData.age);
    urlSearchParams.append('path', formData.path);
    urlSearchParams.append('pathstatus', formData.pathstatus);

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/user/complete-profile`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }


  sendSkillData(formData){
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', localStorage.getItem("id_user"));
    urlSearchParams.append('gameLevel', formData.gameLevel);
    urlSearchParams.append('gameStyle', formData.gameStyle);
    urlSearchParams.append('typeBackhand', formData.typeBackhand);
    urlSearchParams.append('forehand', formData.forehand);
    urlSearchParams.append('backhand', formData.backhand);
    urlSearchParams.append('service', formData.service);
    urlSearchParams.append('volley', formData.volley);
    urlSearchParams.append('resistence', formData.resistence);

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/user/complete-skill`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

  getProfile(id:number){

    return this.http.get(`${this.backUrl}/api/user/get-user/${id}`).map(
      (response) => response.json()
    )

  }

  getImageProfile(id:number){
    return this.http.get(`${this.backUrl}/api/user/get-profile-image/${id}`).map(
      (response) => response.json()
    )
  }

  getProfileStatus(id:number){

    return this.http.get(`${this.backUrl}/api/user/get-user-status/${id}`).map(
      (response) => response.json()
    )

  }

  checkIfPlayer(id:number){

    return this.http.get(`${this.backUrl}/api/user/check-if-player/${id}`).map(
      (response) => response.json()
    )

  }

  getUsersRandom(){
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', localStorage.getItem("id_user"));

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/user/get-user-random`,body, {headers: headers}).map(
      (response) => response.json()
    )

  }

  changePassword(formData){
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', localStorage.getItem("id_user"));
    urlSearchParams.append('newPass', formData.newPass);
    urlSearchParams.append('pass1', formData.pass1);
    urlSearchParams.append('pass2', formData.pass2);

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/user/change-password`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

  newPassword(email){
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('email', email);

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/auth/new-password`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

  getAllUsers(){
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', localStorage.getItem("id_user"));

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/user/get-all-users`,body, {headers: headers}).map(
      (response) => response.json()
    )

  }

  getAllUsersFilter(filter){
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', localStorage.getItem("id_user"));
    urlSearchParams.append('filter', filter);

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/user/get-all-users-filter`,body, {headers: headers}).map(
      (response) => response.json()
    )

  }

}
