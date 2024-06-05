// Implements all services used by dashboard
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiPath = 'http://localhost:3000/users';
  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(this.apiPath);
  }
  addData(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiPath, data, { headers });
  }

  deleteData(id: number) {
    return this.http.delete(`${this.apiPath}/${id}`);
  }

  editData(id: number, data: any) {
    return this.http.put(`${this.apiPath}/${id}`, data);
  }
}