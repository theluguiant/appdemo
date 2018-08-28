import { Component } from '@angular/core';/* tslint:disable */

import { MENU_ITEMS } from './../../config/pages-menu';

@Component({
  selector: 'ngx-layout',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PagesComponent {

  menu = MENU_ITEMS;
}
