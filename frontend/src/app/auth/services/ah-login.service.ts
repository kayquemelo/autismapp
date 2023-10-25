import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { ShSessionService } from 'src/app/shared/services/sh-session.service';

@Injectable({
  providedIn: 'root'
})
export class AhLoginService {
  private readonly auth_uri: string = environment.ENV_AUTH_URI;
  private readonly auth_key: string = environment.ENV_AUTH_KEY;
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private _http: HttpClient, private _session: ShSessionService ) { }

  public reqLogin( user: string, pass: string ): Observable<any> {
    const username = user;
    const password = pass;

    return this._http.post(`${this.auth_uri}/login?username=${username}&password=${password}`, this.httpOptions ).pipe(map((res) => {
      return res;
    }));
  };

  public setAuthData( data: Array<any> ) {
    return this._session.setSessionData(this.auth_key, data);
  };

  public getTokenAndUUID( ) {
    const _token = this._session.getSessionData( this.auth_key ).token;
    const _uuid = this._session.getSessionData( this.auth_key ).user[0].uuid;

    return { token: _token, uuid: _uuid };
  };

  public isLogged(): boolean {
    const data = window.sessionStorage.getItem('auth');

    if (data) {
      return true;
    } else {
      return false;
    }
  };

}
