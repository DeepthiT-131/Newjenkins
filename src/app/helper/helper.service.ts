import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }
  setValue(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
}

getValue(key: string) {
    if (sessionStorage.getItem(key) !== null && sessionStorage.getItem(key) !== 'undefined') {
        return JSON.parse(sessionStorage.getItem(key));
    } else {
        return '';
    }
}

removeValue(key: string) {
    sessionStorage.removeItem(key);
}

clearStorage() {
    sessionStorage.clear();
}

}
