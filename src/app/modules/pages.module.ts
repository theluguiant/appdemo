import { NgModule } from '@angular/core';

import { PagesComponent } from '../components/page/page.component';
import { DashboardModule } from './dashboard.module';
import { PagesRoutingModule } from '../routing/pages-routing.module';
import { ThemeModule } from '../theme-core/@theme/theme.module';
import { MiscellaneousModule } from '../components/miscellaneous/miscellaneous.module';


const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
