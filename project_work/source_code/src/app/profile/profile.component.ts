// Implements profile view of user
import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponseData } from '../auth/auth.service';
import { SharedService } from '../profile-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  data: any;

  constructor(private http: HttpClient,
    private sharedService:SharedService
  ) { }

  ngOnInit(): void {
    this.sharedService.currentUserData.subscribe((data) => {
      this.data = data;
      console.log(data)
    })
  }

}
