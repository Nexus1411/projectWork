// Implements service to access data from auth componenet to view user profile
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  isAuthorized=false;
  private userData = new BehaviorSubject<any>(null);
  currentUserData = this.userData.asObservable();

  constructor() { }

  updateUserData(data: any) {
    this.userData.next(data);
  }
}
