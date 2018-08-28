import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../theme-core/@theme/theme.module';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { StatusCardComponent } from '../theme-core/pages/dashboard/status-card/status-card.component';
import { ContactsComponent } from '../theme-core/pages/dashboard/contacts/contacts.component';
import { RoomsComponent } from '../theme-core/pages/dashboard/rooms/rooms.component';
import { RoomSelectorComponent } from '../theme-core/pages/dashboard/rooms/room-selector/room-selector.component';
import { TemperatureComponent } from '../theme-core/pages/dashboard/temperature/temperature.component';
import { TemperatureDraggerComponent } from '../theme-core/pages/dashboard/temperature/temperature-dragger/temperature-dragger.component';
import { TeamComponent } from '../theme-core/pages/dashboard/team/team.component';
import { KittenComponent } from '../theme-core/pages/dashboard/kitten/kitten.component';
import { SecurityCamerasComponent } from '../theme-core/pages/dashboard/security-cameras/security-cameras.component';
import { ElectricityComponent } from '../theme-core/pages/dashboard/electricity/electricity.component';
import { ElectricityChartComponent } from '../theme-core/pages/dashboard/electricity/electricity-chart/electricity-chart.component';
import { WeatherComponent } from '../theme-core/pages/dashboard/weather/weather.component';
import { SolarComponent } from '../theme-core/pages/dashboard/solar/solar.component';
import { PlayerComponent } from '../theme-core/pages/dashboard/rooms/player/player.component';
import { TrafficComponent } from '../theme-core/pages/dashboard/traffic/traffic.component';
import { TrafficChartComponent } from '../theme-core/pages/dashboard/traffic/traffic-chart.component';
import { NewFooterComponent } from '../components/footer/footer.component';
import { MetaComponent } from '../components/card-meta/meta.component';
import { PieChartComponent } from '../components/pie-chart/piechart.component';
import { MultipleXaxisComponent } from '../components/multiplexaxis/multiplexaxis.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { ChartjsBarCustomComponent } from '../components/bar/chartjs-bar-custom.component';
import { StatusCardCustomComponent } from '../components/status-card/status-card.component';

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule
  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent,    
    NewFooterComponent,
    TemperatureDraggerComponent,
    ContactsComponent,
    RoomSelectorComponent,
    TemperatureComponent,
    RoomsComponent,
    PieChartComponent,
    TeamComponent,
    KittenComponent,
    SecurityCamerasComponent,
    ElectricityComponent,
    ElectricityChartComponent,
    WeatherComponent,
    PlayerComponent,
    SolarComponent,
    TrafficComponent,
    TrafficChartComponent,
    MetaComponent,
    MultipleXaxisComponent,
    ChartjsBarCustomComponent,
    StatusCardCustomComponent
  ],
})
export class DashboardModule { }
