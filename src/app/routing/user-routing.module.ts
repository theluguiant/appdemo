import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { UserComponent } from '../components/users/user.component';
import { UserListComponent } from '../components/users/user-list/user-list.component';

const routes: Routes = [{
  path: '',
  component: UserComponent,
  children: [{
    path: 'list-users',
    component: UserListComponent,
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
