import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ValidateService} from '../../services/validate.service';
import { AuthService } from '../../services/auth.service'
import { FlashMessagesService} from 'angular2-flash-messages'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  message: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router ) {
    this.message = '';
   }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email : this.email,
      username: this.username,
      password: this.password
    }

    if (!this.validateService.validateInput(user) ) {
      this.flashMessage.show('Please fill all the details',{cssClass:'alert-danger', timeout:3000})
      return false;
    }

    if (!this.validateService.validateEmail(user.email) ) {
      this.flashMessage.show('Please enter correct email',{cssClass:'alert-danger', timeout:3000})
      return false;
    }

    this.authService.register(user).subscribe(res => {
      if (res.success) {
        this.flashMessage.show('You are registered and can log in', {cssClass: 'alert-success', timeout:3000})
        this.router.navigate(['/login'])
      } else {
        this.flashMessage.show(res.msg, {cssClass: 'alert-danger', timeout:3000})
        this.router.navigate(['/register'])

      }
    })



    

  }

}
