import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class Constants {
    notificationTimeout: number
    basePath: string
    commonAPIErrorMessage: string
    inactiveErrorMessage: string
    validationErrorMessageCharacterLimit: 35
    ValidationMessageKeys: any
    constructor() {
        this.notificationTimeout = 7000
        this.validationErrorMessageCharacterLimit = 35
        this.basePath = environment.basePath
        this.commonAPIErrorMessage = 'Server Error'
        this.inactiveErrorMessage = 'Your account is inactive. Please contact administrator.'
        this.ValidationMessageKeys = {
            required: '',
            invalidEmail: '',
            invalidPassword: '',
            minlength: '',
            passwordMismatch: '',
        }
    }
}

export enum ToastTypes {
    Success = 0,
    Warning = 1,
    Error = 2,
    Information = 3
}