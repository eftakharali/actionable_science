import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  fbLogin() {
    this.authService.authenticateFBUser().subscribe(data => {
      console.log(data)
      /*
      if (data.success) {
        this.authService.storeUserData(data.token, data.user)
        this.router.navigate(['/dashboard']) 

      } else {
        this.flashMessage.show(data.msg, {cssClass :'alert-danger', timeout: 5000})
        this.router.navigate(['/login'])
      }*/

  })



}

  twitterLogin() {
    this.authService.authenticateTwitterUser().subscribe(data => {
      console.log(data)
    })
  }
}
