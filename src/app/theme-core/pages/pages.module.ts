import { NgModule } from '@angular/core';
/* tslint:disable */
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from '../../routing/pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { SampleLayoutComponent } from '../@theme/layouts/sample/sample.layout';


const PAGES_COMPONENTS = [
  PagesComponent
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
  ],
  declarations: [
    PagesComponent,
    SampleLayoutComponent
  ],
})
export class PagesModule {
}
