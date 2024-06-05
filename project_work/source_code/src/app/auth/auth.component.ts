// Implements authentication page with signup and signin functionality
import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SharedService } from '../profile-data.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isLoginMode = true;
  error:string=null;
  userData:any;

  constructor(private authService: AuthService, 
    private router:Router, 
    private sharedService:SharedService) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs=this.authService.login(email,password);
    }
    else {
      authObs=this.authService.signup(email, password);
    }

    authObs.subscribe(
      (resData)=>{
        console.log(resData);
        this.userData=resData;
        this.sharedService.updateUserData(resData);
        this.router.navigate(['/dashboard'])
      },
      (errorMsg)=>{
        console.log(errorMsg);
        this.error=errorMsg;
      }
    )

    form.reset();
  }

}
