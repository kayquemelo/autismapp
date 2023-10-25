import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShSessionService {
  private readonly defaultKey: string = 'default-session';
  private _session = window.sessionStorage;

  constructor() { }

  // Clear session data
  public clearSessionData( key: string | null ) {
    if ( !key ) {
      key = this.defaultKey;
    };

    return this._session.clear();
  };

  
  // Remove session item
  public removeSessionItem( key: string | null ) {
    if ( !key ) {
      key = this.defaultKey;
    };

    return this._session.removeItem( key );
  };

  
  // Set session data
  public setSessionData( key: string | null, data: Array<any> ) {
    if ( !key ) {
      key = this.defaultKey;
    };

    return this._session.setItem( key, JSON.stringify(data) );
  };

  
  // Get session data
  public getSessionData( key: string | null ) {
    if ( !key ) {
      key = this.defaultKey;
    };

    const data = window.sessionStorage.getItem( key );

    if (data) {
      return JSON.parse(data);
    } else {
      return {};
    }
  };


  // Verify session data
  public verifySessionData( key: string | null ) {
    if ( !key ) {
      key = this.defaultKey;
    };

    return this._session.length;
  };

}
