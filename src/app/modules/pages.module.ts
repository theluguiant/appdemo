import { NgModule } from '@angular/core';

import { PagesComponent } from '../components/page/page.component';
import { DashboardCustomModule } from './dashboard.module';
import { PagesRoutingModule } from '../routing/pages-routing.module';
import { ThemeModule } from '../theme-core/@theme/theme.module';
import { MiscellaneousModule } from '../components/miscellaneous/miscellaneous.module';
import { UserModule } from './user.module';

/* tslint:disable */
const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardCustomModule,
    MiscellaneousModule,
    UserModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
