import { Component } from '@angular/core';

import { MENU_ITEMS } from './../../config/pages-menu';

@Component({
  selector: 'ngx-layout',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PagesComponent {

  menu = MENU_ITEMS;
}
