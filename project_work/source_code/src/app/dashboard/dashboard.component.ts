// Implements dashboard page which will be accessed only if user is authenticated
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from '../profile-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  checkAuth:boolean
  data: any=[];
  newRecord: any = {name:'',email:''}
  editRecord: any={};
  constructor(private dataService: DataService,private sharedService:SharedService) { }
  ngOnInit(): void {
    this.checkAuth=this.sharedService.isAuthorized;
    this.dataService.getData()
      .subscribe((res) => {
        this.data = res;
        console.log(this.data);
      },(error:HttpErrorResponse)=>{
        console.log("Error:: ", error);
      })
  }

  generateId(): number {
    // return this.data.length > 0 ? Math.max(...this.data.map(item => item.id)) + 1 : 1;
    return this.data.length +1;
  }

  addRecord() {
    const newId=this.generateId();
    const record={id:newId, ...this.newRecord};
    this.dataService.addData(record)
      .subscribe((res) => {
        this.data.push(res);
        this.newRecord = {};
      }, (error) => {
        console.log("Error:: ", error);
      });
  }

  deleteRecord(id: number) {
    this.dataService.deleteData(id)
      .subscribe(() => {
        this.data = this.data.filter((item) => item.id !== id);
      }, (error) => {
        console.log("Error:: ", error);
      });
  }

  updateRecord(id: number) {
    this.dataService.editData(id, this.editRecord[0])
      .subscribe((res) => {
        this.data = this.data.map((item) => item.id === id ? res : item);
        this.editRecord = {};
      }, (error) => {
        console.log("Error:: ", error);
      });
  }

  saveEditRecord(id:number) {
    this.updateRecord(id);
  }
  edit(id:number){
    this.editRecord = this.data.filter((item) => item.id === id);
    console.log(this.editRecord[0]);
  }
}
