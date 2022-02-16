import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { BehaviorSubject, Observable, of } from "rxjs"
import { environment } from "src/environments/environment"
import { SessionStorageService } from "./session-storage.service"

@Injectable({
    providedIn: "root"
})

export class AuthService {
    isLoggedin: boolean=false
    public authSubject = new BehaviorSubject<boolean>(false);
    public isLoggedIn$ = this.authSubject.asObservable();
    constructor(
        public http: HttpClient,
        private sessionStorage: SessionStorageService,
        public router: Router,
    ) {
        if (this.isLoggedIn()) {
            this.updateLoginStatus(true)
        }
    }


    /**
    * To checkout wheather logged in
    * @returns boolean- wheather logged in
    */
    isLoggedIn(): boolean {
        const existingToken = this.sessionStorage.get('accessToken')
        if (existingToken) {
            return true
        } else {
            return false
        }
    }

    /**
     * To update the login status
     * @param next status to be passed
     */
    updateLoginStatus(status: boolean): void {
        this.authSubject.next(status)
    }

    /**
     * To  get the current status of login
     */
    getLogginStatus(): Observable<boolean> {
        return this.isLoggedIn$
    }

    /**
     * Request to login
     * @returns The session data
     */
    loginUser(loginDetails: any): Observable<any> {
        this.isLoggedin=true;
        return this.http.post<any>(environment.basePath + 'login', loginDetails)
    }

    
}