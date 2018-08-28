import { NgModule } from '@angular/core';

import { ThemeModule } from '../theme-core/@theme/theme.module';
import { ReportsRoutingModule } from '../routing/report-routing.module';
import { ReportComponent } from '../components/report/report.component';
import { ReportCreateComponent } from '../components/report/report-create/report-create.component';

const components = [
  ReportComponent,
  ReportCreateComponent
];

@NgModule({
    imports: [
      ThemeModule,
      ReportsRoutingModule
    ],
    declarations: [
      ...components,
    ]
  })
export class ReportModule { }