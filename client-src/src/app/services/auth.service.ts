import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'
import 'rxjs/add/operator/map'
import { tokenNotExpired } from 'angular2-jwt'

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  register(user) {
    const headers = new Headers();
    headers.append('Content-Type','application/json');

    return this.http.post('http://localhost:1000/users/register', user, {headers:headers})
      .map(res => res.json())

  }

  authenticateUser(user) {
    const headers = new Headers();
    headers.append('Content-Type','application/json');

    return this.http.post('/users/authenticate', user, {headers: headers})
      .map(res => res.json())

  }


  authenticateFBUser() {
    console.log('service fb')
    const headers = new Headers()
    headers.append('Access-Control-Allow-Origin','*')
    headers.append('Content-Type','application/json')
    return this.http.get('/users/auth/facebook',{headers: headers}).map(res => {
      console.log('service', res)
      return res.json()
    })
  }

  authenticateTwitterUser() {
    console.log('service twitter')
    return this.http.get('/users/auth/twitter').map(res => {
      console.log('service', res)
      return res.json()
    })
  }

  getProfile() {
    const headers = new Headers();
    this.loadToken()
    headers.append('Authorization', this.authToken)
    headers.append('Content-Type','application/json');

    return this.http.get('/users/profile', {headers: headers})
      .map(res => res.json())

  }

 

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user))
    this.authToken = token
    this.user = user
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired()
  }


  logOutUser() {
    this.authToken = null
    this.user = null;
    localStorage.clear()
  }

}
