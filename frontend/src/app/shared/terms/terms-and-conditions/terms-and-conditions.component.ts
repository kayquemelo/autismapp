import { Component } from '@angular/core';
import { ShGeneralService } from '../../services/sh-general.service';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.css']
})
export class TermsAndConditionsComponent {
  public readonly sysName: string;
  public readonly sysDomain: string;

  constructor ( private sh_general: ShGeneralService ) {
    this.sysName = this.sh_general.infoSys.sys_name;
    this.sysDomain = this.sh_general.infoSys.sys_domain;
  }
}
