import { NgModule } from '@angular/core';/* tslint:disable */
import { Routes, RouterModule } from '@angular/router';

import { ReportComponent } from '../components/report/report.component';
import { ReportCreateComponent } from '../components/report/report-create/report-create.component';

const routes: Routes = [{
  path: '',
  component: ReportComponent,
  children: [{
    path: 'create',
    component: ReportCreateComponent,
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule { }
