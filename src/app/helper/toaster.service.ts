import { Injectable } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(public toastr: ToastrManager) { }
  showToast(position: any = 'top-full-width') {
    this.toastr.infoToastr('This is a toast.', 'Toast', {
        position: position
    });
}

  success = (message?: string, title?: string) => {
    this.toastr.successToastr(message, title, {toastLife: 5000,position: 'top-center'});
  }

  error = (message?: string, title?: string) => {
    this.toastr.errorToastr(message, title,  {toastLife: 5000,position: 'top-center'});
  }

  warning = (message?: string, title?: string) => {
    this.toastr.warningToastr(message, title,  {toastLife: 5000,position: 'top-center'});
  }

  info = (message?: string, title?: string) => {
    this.toastr.infoToastr(message, title,  {toastLife: 5000,position: 'top-center'});
  }
  
  clearAllToasts = () => {
    this.toastr.dismissAllToastr();
  }

}
