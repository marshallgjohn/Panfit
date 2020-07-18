import { Injectable, ErrorHandler } from '@angular/core';

import { TokenService } from './token.service'
import { Credentials } from '../model/credentials';
import { HttpClient,HttpResponse,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {User} from '../model/registerUser';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  static readonly TOKEN_STORAGE_KEY = 'token';
  redirectToUrl: string = '/pre-workout';


  constructor(private router: Router, private tokenService: TokenService, private httpClient: HttpClient) { }

  public login(credentials: Credentials): void {
    this.tokenService.getResponseHeaders(credentials)
    .subscribe((res: HttpResponse<any>) => {
      this.saveToken(res.headers.get('authorization'));
      this.router.navigate([this.redirectToUrl]);
    });
  }

  public register(credentials: Credentials, email: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response'
    };
    return this.httpClient.post<User>("http://localhost:8080/api/users",new User(email,credentials),httpOptions).pipe(
      catchError(error => {
          if(error.status === 500) {
            error ="test";
          }
          return throwError(error);
      })
    );
  }

  private saveToken(token: string){
    localStorage.setItem(AccountService.TOKEN_STORAGE_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(AccountService.TOKEN_STORAGE_KEY);
  }

  public logout(): void {
    localStorage.removeItem(AccountService.TOKEN_STORAGE_KEY);
    this.tokenService.logout()
    .subscribe(() =>{
      console.log("TEST");
      localStorage.removeItem(AccountService.TOKEN_STORAGE_KEY);
    });
  }

  public isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private handleError(error: HttpErrorResponse) {
    return throwError('Username is taken please try something else');
  }
}