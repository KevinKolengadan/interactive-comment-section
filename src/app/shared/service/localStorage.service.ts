import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  /**
   * Save data to local storage
   * @param key
   * @param value
   */
  public saveData(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Get data from local storage
   * @param key
   */
  public getData(key: string) {
    let data = localStorage.getItem(key);
    if(data) {
      return JSON.parse(data);
    }
    return null;
  }

  /**
   * Remove data from local storage
   * @param key
   */
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  /**
   * Clear all data from local storage
   */
  public clearData() {
    localStorage.clear();
  }
}
