import { Component } from '@angular/core';
import { ShGeneralService } from '../../services/sh-general.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent {
  public readonly sysName: string;
  public readonly sysDomain: string;

  constructor ( private sh_general: ShGeneralService ) {
    this.sysName = this.sh_general.infoSys.sys_name;
    this.sysDomain = this.sh_general.infoSys.sys_domain;
  }

}
