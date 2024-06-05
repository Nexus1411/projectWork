import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    //emit a new user whenever we have 1(when we login) also when we logout(when we clear the user i.e. user becomes invalid or token expired)
    // user = new Subject<User>();
    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient, private router:Router) { }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBtB0ewWa7WmgrSGDElJ0VAxjX7dX-JuHw',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
            .pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        +resData.expiresIn
                    )
                })
            )
    }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBtB0ewWa7WmgrSGDElJ0VAxjX7dX-JuHw',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
            .pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        +resData.expiresIn
                    )
                })
            )
    }

    private handleError(errorRes: HttpErrorResponse) {
        console.log(errorRes.message)
        let errorMsg = "An unknown error occurred!!";
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMsg);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMsg = 'Email address is already in use!!'
                break;
            case 'EMAIL_NOT_FOUND':
                errorMsg = 'No user record corresponding to this identifier!!'
                break;
            case 'INVALID_PASSWORD':
                errorMsg = 'Password is invalid or the user does not have a password!!'
                break;
        }
        return throwError(errorMsg);
    }

    private handleAuthentication(email:string,userId:string, token: string,expiresIn:number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(
            email,
            userId,
            token,
            expirationDate
        )
        // to set/emit this as our now currently loggedIn user 
        this.user.next(user);
    }
    logout(){
        this.router.navigate(['auth']);
    }
}