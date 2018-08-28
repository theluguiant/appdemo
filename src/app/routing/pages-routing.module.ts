import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from '../components/page/page.component';/* tslint:disable */
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { NotFoundComponent } from '../components/miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: 'report',
    loadChildren: './../modules/reports.module#ReportModule',
  }, {
    path: 'user',
    loadChildren: './../modules/user.module#UserModule',
  },
  {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
