import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  apiUrl = environment.apiUrl;

  auth0 = new auth0.WebAuth({
    clientID: '1ZBj8dstoxp3dJBxVEee0756wyv3Gl09',
    domain: 'martinbobbio.auth0.com',
    responseType: 'token id_token',
    audience: 'https://martinbobbio.auth0.com/userinfo',
    redirectUri: this.apiUrl+'/callback',
    scope: 'openid profile'
  });

  

  public userProfile:any;

  constructor() {}

  public login(): void {
    this.auth0.authorize();
  }


  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        window.location.href = "/";
      } else if (err) {
        window.location.href = "/";
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    location.reload();
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('id_user');
    localStorage.removeItem('new_user');
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');
    // Go back to the home route
    window.location.href = "/";
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access Token must exist to fetch profile');
    }
  
    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  }



}