import { Component, Input } from '@angular/core';

@Component({
  selector: 'status-card-custom',
  styleUrls: ['./status-card.component.scss'],
  templateUrl: './status-card.component.html',
})
export class StatusCardCustomComponent {

  @Input() title: string;
  @Input() type: string;
  @Input() on = false;
  @Input() data: any;
}
