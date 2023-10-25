import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeAuthComponent } from './themes/theme-auth/theme-auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import { BreadcrumbComponent } from './themes/breadcrumb/breadcrumb.component';
import { TableComponent } from './themes/table/table.component';
import { PrivacyPolicyComponent } from './terms/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './terms/terms-and-conditions/terms-and-conditions.component';


@NgModule({
  declarations: [
    ThemeAuthComponent,
    BreadcrumbComponent,
    TableComponent,
    PrivacyPolicyComponent,
    TermsAndConditionsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ], 
  exports: [
    CommonModule,
    ThemeAuthComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BreadcrumbComponent,
    TableComponent,
    PrivacyPolicyComponent,
    TermsAndConditionsComponent,
  ]
})
export class SharedModule { }
