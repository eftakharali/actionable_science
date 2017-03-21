import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateInput(user) {
    
    if(!user.name || !user.username || !user.email || !user.password) return false;

    return true;

  }

  validateEmail(email) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex.test(email);

  }

  validateLogin(user) {
    
    if(!user.username || !user.password) return false;

    return true;

  }

}
