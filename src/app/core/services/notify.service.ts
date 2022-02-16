import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Constants, ToastTypes } from '../../config/app.configs';



@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  toastOptions: Object
  toastTypes = ToastTypes


  constructor(private toastyService: ToastrService,
    private appConstants: Constants,
    
  ) {
    this.toastOptions = {
      closeButton: true,
      timeOut: this.appConstants.notificationTimeout,
      positionClass: 'toast-top-right',
      enableHtml: true,
      tapToDismiss: false
    }
  }


  show(status: number, messages: any) {
    let type
    let msg = ''
    switch (status) {
      case this.toastTypes.Success:
        type = 'success'
        break
      case this.toastTypes.Warning:
        type = 'warning'
        break
      case this.toastTypes.Error:
        type = 'error'
        break
      default:
        type = 'default'
    }

    msg = messages

    if (msg !== '') {
      const message = msg
      const title = message
      this.toastyService[type](message, title, this.toastOptions)
    }
  }
}
