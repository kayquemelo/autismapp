import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShLocalstorageService {
  private readonly defaultKey: string = 'default-localStorage';
  private _localStorage = window.localStorage;

  constructor() { }

  // Clear localStorage data
  public clearLocalStorageData( key: string | null ) {
    if ( !key ) {
      key = this.defaultKey;
    };

    return this._localStorage.clear();
  };

  
  // Remove localStorage item
  public removeLocalStorageItem( key: string | null ) {
    if ( !key ) {
      key = this.defaultKey;
    };

    return this._localStorage.removeItem( key );
  };

  
  // Set localStorage data
  public setLocalStorageData( key: string | null, data: Array<string> ) {
    if ( !key ) {
      key = this.defaultKey;
    };

    return this._localStorage.setItem( key, JSON.stringify(data) );
  };

  
  // Read localStorage data
  public readLocalStorageData( key: string | null ) {
    if ( !key ) {
      key = this.defaultKey;
    };

    return this._localStorage.getItem( key );
  };


  // Verify localStorage is empty or not
  public localStorageIsEmpty( key: string | null ) {
    if ( !key ) {
      key = this.defaultKey;
    };

    if ( this._localStorage.length > 1 ) {
      return false;
    };

    return true;
  };

}
