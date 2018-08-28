import { NgModule } from '@angular/core';

/* tslint:disable */
import { ThemeModule } from '../theme-core/@theme/theme.module';
import { UserRoutingModule } from '../routing/user-routing.module';
import { UserComponent } from '../components/users/user.component';
import { UserListComponent } from '../components/users/user-list/user-list.component';
import { SmartTableService } from '../theme-core/@core/data/smart-table.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';

const components = [
  UserComponent,
  UserListComponent
];

@NgModule({
    imports: [
      ThemeModule,
      Ng2SmartTableModule,
      UserRoutingModule
    ],
    declarations: [
      ...components,
    ],providers: [
      SmartTableService,
    ],
  })
export class UserModule { }