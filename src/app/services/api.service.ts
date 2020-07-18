import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {RoutineEntry} from '../model/routineEntry';
import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string;

  constructor(private http: HttpClient) { 
    this.baseUrl = 'http://localhost:8080/api';
  }

  getAll(object): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${object}`);
  }

  get(id,object): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${object}/${id}`);
  }

  post(type,object): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response'
    };

    return this.http.post<any>(`${this.baseUrl}${type}`,object,httpOptions);
  }

}
