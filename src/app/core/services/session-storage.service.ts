import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
  ) { }

  /**
   * To save the session data
   * @param key 
   */
  set(key:any, data:any) {
    // const value = JSON.stringify(data)
    window.localStorage.setItem(key, data)
  }

  get(key:any) {
    const storedData = window.localStorage.getItem(key)
    if (storedData) {
      let data
      // data = JSON.parse(storedData)
      return storedData
    }
    return null
  }

  clearAll() {
    window.localStorage.clear()
    this.router.navigate(['/auth'])
  }
}