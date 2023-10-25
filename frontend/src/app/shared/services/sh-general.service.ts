import { Injectable } from '@angular/core';
import { InfoAddr, InfoSys, SocialFacebook, SocialGoolge, SocialTwitter, TimeConnection } from '../interfaces/shared';
import { environment } from 'src/environments/environment';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ShGeneralService {

  public _reloadPage = window.location;
  public _console = window.console;
  public readonly _defaultIMG: string = './assets/no-image.jpg'; 
  
  public readonly infoSys: InfoSys = {
    sys_version: `${environment.ENV_SYS_VERSION}`,
    sys_name: `${environment.ENV_SYS_NAME}`,
    sys_logo: `${environment.ENV_SYS_LOGO}`,
    sys_title: `${environment.ENV_SYS_TITLE}`,
    sys_desc: `${environment.ENV_SYS_DESC}`,
    sys_domain: `${environment.ENV_SYS_DOMAIN}`,
  };

  public readonly infoAddr: InfoAddr = {
    addr_street: `${environment.ENV_ADDR_STREET}`,
    addr_number: `${environment.ENV_ADDR_NUMBER}`,
    addr_complement: `${environment.ENV_ADDR_COMPLEMENT}`,
    addr_city: `${environment.ENV_ADDR_CITY}`,
    addr_state: `${environment.ENV_ADDR_STATE}`,
    addr_zipcode: `${environment.ENV_ADDR_ZIPCODE}`,
  }

  public readonly socialTwitter: SocialTwitter = {
    tt_creator: `${environment.ENV_SOCIAL_TWITTER_CREATOR}`,
    tt_publish: `${environment.ENV_SOCIAL_TWITTER_PUBLISH}`,
  };

  public readonly socialFacebook: SocialFacebook = {
    fb_app: `${environment.ENV_SOCIAL_FACEBOOK_APP}`,
    fb_page: `${environment.ENV_SOCIAL_FACEBOOK_PAGE}`,
    fb_author: `${environment.ENV_SOCIAL_FACEBOOK_AUTHOR}`,
  };

  public readonly socialGoogle: SocialGoolge = {
    gg_page: `${environment.ENV_SYS_VERSION}`,
    gg_author: `${environment.ENV_SYS_VERSION}`,
  };

  private readonly timeConnection: TimeConnection = {
    tc_limit: `${environment.ENV_TC_LIMIT}`,
    tc_warning: `${environment.ENV_TC_WARNING}`,
    tc_refresh: `${environment.ENV_TC_REFRESH}`,
  };

  constructor( private _toastr: ToastrService ) {
    // configuration for toastr
    this._toastr.toastrConfig.autoDismiss = true;
    this._toastr.toastrConfig.closeButton = true;
    this._toastr.toastrConfig.newestOnTop = true;
    this._toastr.toastrConfig.progressBar = true;
    this._toastr.toastrConfig.maxOpened = 5;
  }

  public reloadTimeout( time: number | null ) {
    if ( !time ) {
      time = 300;
    };
    
    return setTimeout(() => {
      this._reloadPage.reload();
    }, time);
  };

  public notify(type: string, message: string) {
    if ( type === 'success' ) {
      return this._toastr.success(message);
    } else if ( type === 'info' ) {
      return this._toastr.info(message);
    } else if ( type === 'warning' ) {
      return this._toastr.warning(message);
    } else if ( type === 'error' ) {
      return this._toastr.error(message);
    } else {
      return this._toastr.warning("Por favor, informe o tipo da notificação");
    };
  };

}
