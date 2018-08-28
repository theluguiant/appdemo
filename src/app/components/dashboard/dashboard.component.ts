import {Component, OnDestroy} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators/takeWhile' ;
/* tslint:disable */
import { MetaComponent } from '../card-meta/meta.component';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
  data: any
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {

  private alive = true;

  public lightCard: CardSettings = {
    title: 'Usuarios',
    iconClass: 'nb-person',
    type: 'primary',
    data: 20
  };
  public rollerShadesCard: CardSettings = {
    title: 'Fecha actual',
    iconClass: 'fa fa-bank',
    type: 'success',
    data: '26-08-2018'
  };
  public wirelessAudioCard: CardSettings = {
    title: 'Meta del mes',
    iconClass: 'nb-bar-chart',
    type: 'info',
    data: '40%'
  };
  public coffeeMakerCard: CardSettings = {
    title: 'Meta del año',
    iconClass: 'nb-bar-chart',
    type: 'warning',
    data: '65%'
  };

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.lightCard,
    this.rollerShadesCard,
    this.wirelessAudioCard,
    this.coffeeMakerCard,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.lightCard,
        type: 'warning',
      },
      {
        ...this.rollerShadesCard,
        type: 'primary',
      },
      {
        ...this.wirelessAudioCard,
        type: 'danger',
      },
      {
        ...this.coffeeMakerCard,
        type: 'secondary',
      },
    ],
  };

  constructor(private themeService: NbThemeService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
        console.log(this.statusCards);
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
