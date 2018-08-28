import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
/* tslint:disable */
@Component({
  selector: 'pie-chart',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class PieChartComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      console.log(config);
      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['Zona Industrial', 'San Agustín', 'San Andrés', 'San Cayetano', 'La Ferreria'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'Barrio',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: [
              { value: 4268956162, name: 'Zona Industrial' },
              { value: 1768956162, name: 'San Agustín' },
              { value: 2768956162, name: 'San Andrés' },
              { value: 768956162, name: 'San Cayetano' },
              { value: 1768956162, name: 'La Ferreria' },
              
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
