import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MapService {

  backUrl = environment.backUrl;

  constructor(private http:Http) {}

  getClubes(latitud,longitud){

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('lat', latitud);
    urlSearchParams.append('lon', longitud);

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/map/get-clubes`,body, {headers: headers}).map(
      (response) => response.json()
    )

  }

  getClub(googlePlaceId){

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id_google_place', googlePlaceId);

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/map/get-club`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

  setClubFavorite(googlePlaceId){
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id_google_place', googlePlaceId);
    urlSearchParams.append('id_user', localStorage.getItem("id_user"));

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/club-favorite/new`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }


  getClubesMost(){

    return this.http.get(`${this.backUrl}/api/club-favorite/get-clubes`).map(
      (response) => response.json()
    )

  }

}
