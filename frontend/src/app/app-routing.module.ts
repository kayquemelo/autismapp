import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isLoggedGuard } from './auth/guards/ah-login.guard';

const routes: Routes = [
  { path: "login", loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: "user",  loadChildren: () => import('./private/private.module').then(m => m.PrivateModule) },
  { path: "",   pathMatch: 'full', redirectTo: 'login' },
  { path: "**", pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
