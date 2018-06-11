import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'
import 'rxjs/add/operator/map'
import { environment } from '../../environments/environment';

@Injectable()
export class TournamentService {

  backUrl = environment.backUrl;

  constructor(private http:Http) {}

  getTournamentRandom(){

    return this.http.get(`${this.backUrl}/api/tournament/get-tournament-random`).map(
      (response) => response.json()
    )
  }

  getTournament(id){

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();

    urlSearchParams.append('id_user', localStorage.getItem("id_user"));
    urlSearchParams.append('id_tournament', id);

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/tournament/get-tournament`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

  getTouranentsByUser(){

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id_user', localStorage.getItem("id_user"));

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/tournament/get-tournament-by-user`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

  uploadScore(formData){
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();

    urlSearchParams.append('id_tournament', formData.id_tournament);
    urlSearchParams.append('id_user_1', formData.id_user_1);
    urlSearchParams.append('id_user_2', formData.id_user_2);
    urlSearchParams.append('id_tournament_1', formData.id_tournament_1);
    urlSearchParams.append('id_tournament_2', formData.id_tournament_2);
    urlSearchParams.append('set1a', formData.set1a);
    urlSearchParams.append('set1b', formData.set1b);
    urlSearchParams.append('set1c', formData.set1c);
    urlSearchParams.append('set2a', formData.set2a);
    urlSearchParams.append('set2b', formData.set2b);
    urlSearchParams.append('set2c', formData.set2c);
    urlSearchParams.append('win', formData.win);
    urlSearchParams.append('position', formData.position);
    urlSearchParams.append('instance', formData.instance);

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/tournament/upload-score`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

  getTournaments(){

    return this.http.get(`${this.backUrl}/api/tournament/get-tournaments`).map(
      (response) => response.json()
    )
  }

  createTournament(formData){
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();

    urlSearchParams.append('id_user', localStorage.getItem("id_user"));
    urlSearchParams.append('title', formData.title);
    urlSearchParams.append('count', formData.count);
    urlSearchParams.append('date', formData.date);
    urlSearchParams.append('hour', formData.hour);
    urlSearchParams.append('lon', formData.lon);
    urlSearchParams.append('lat', formData.lat);
    urlSearchParams.append('googlePlaceId', formData.googlePlaceId);

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/tournament/new-tournament`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

  getMyTournaments(){
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();

    urlSearchParams.append('id_user', localStorage.getItem("id_user"));

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/tournament/get-my-tournaments`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

  inscription(id_tournament, count){
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();

    urlSearchParams.append('id_user', localStorage.getItem("id_user"));
    urlSearchParams.append('id_tournament', id_tournament);
    urlSearchParams.append('count', count);

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/tournament/inscription`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

  leave(id_tournament, count){
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();

    urlSearchParams.append('id_user', localStorage.getItem("id_user"));
    urlSearchParams.append('id_tournament', id_tournament);
    urlSearchParams.append('count', count);

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/tournament/leave`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

}
