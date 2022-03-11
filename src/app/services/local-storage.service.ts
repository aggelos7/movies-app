import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  // localStorageEmitter = new BehaviorSubject('');

  constructor() { }

  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      // this.localStorageEmitter.next(data);
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  get(key: string): any {
    try {
      const data = localStorage.getItem(key);
      return data;
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }
}
