import { Component } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent {

  public youtubeVideo: Array<any>;

  constructor ( private title: Title, public _sanitizer: DomSanitizer ) {
    this.title.setTitle('Feed | AutismApp');

    this.youtubeVideo = [
      { title: 'O que é AutismAppo?', link: this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/8uTHFYAQtnA?si=jQVCajcAIAH0kO36') },
    ]
  }

}
