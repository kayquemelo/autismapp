import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent {
  public foruns: Array<any>;

  constructor ( private title: Title ) {
    this.title.setTitle('Comunidade | AutismApp');

    this.foruns = [
      { title: 'Canal autismo - todas as informações possíveis sobre autismo', desc: 'https://t.me/canal_autismo', image: 'assets/autismo-forum.jpg' },
    ]
  }
}
