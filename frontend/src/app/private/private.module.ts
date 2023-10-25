import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { FeedComponent } from './feed/feed.component';
import { CommunityComponent } from './community/community.component';

@NgModule({
  declarations: [
    HomeComponent,
    FeedComponent,
    CommunityComponent,
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    SharedModule,
  ]
})
export class PrivateModule { }
