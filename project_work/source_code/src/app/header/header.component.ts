// Implements header which includes 2 properties(profile view and logout)
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SharedService } from '../profile-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit,OnDestroy {
  isAuth=false;
  private userSub:Subscription;
  constructor(private authService:AuthService,private router:Router, private sharedService: SharedService){}  
  
  ngOnInit(): void {
    this.userSub=this.authService.user.subscribe(user=>{
      this.isAuth=!!user;
      this.sharedService.isAuthorized=this.isAuth;
    })
  }
  onLogout(){
    this.authService.logout();
    this.isAuth=false;
    this.sharedService.isAuthorized=this.isAuth;
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
}
