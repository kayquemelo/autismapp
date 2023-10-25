import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FeedComponent } from './feed/feed.component';
import { CommunityComponent } from './community/community.component';
import { isLoggedGuard } from '../auth/guards/ah-login.guard';

const routes: Routes = [
  { path: "", component: HomeComponent, children: [
    { path: 'feed', component: FeedComponent },
    { path: 'community', component: CommunityComponent },
    { path: '', pathMatch: 'full', redirectTo: 'feed' }
  ] },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
