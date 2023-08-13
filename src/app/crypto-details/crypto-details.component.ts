import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiServiceService} from "../service/api-service.service";
import {ChartConfiguration, ChartType} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts'

@Component({
  selector: 'app-crypto-details',
  templateUrl: './crypto-details.component.html',
  styleUrls: ['./crypto-details.component.css']
})
export class CryptoDetailsComponent implements OnInit {
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: `Price Trends`,
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#009688',
        pointBackgroundColor: '#009688',
        pointBorderColor: '#009688',
        pointHoverBackgroundColor: '#009688',
        pointHoverBorderColor: '#009688',

      }
    ],
    labels: []
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 1
      }
    },

    plugins: {
      legend: { display: true },
    }
  };
  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) myLineChart !: BaseChartDirective;
  public cryptoId !: string
  public cryptoData :any
  public days : number = 30
  public currency: string = 'ZAR'

  constructor(private activatedRoute : ActivatedRoute,private api: ApiServiceService,private router : Router) {
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe(val=>{
      this.cryptoId = val['id'];
    });
    this.getCurrencyData()
    this.getCryptoGraphData(this.days)
  }

  public getCurrencyData(){
    this.api.getCryptoCurrencyById(this.cryptoId).subscribe(res => {
      this.cryptoData = res
    })
  }

  public getCryptoGraphData(days:number){
    this.days = days
    this.api.getCryptoGraphCurrencyData(this.cryptoId,this.currency,this.days).subscribe(res => {
      setTimeout(() => {
        this.myLineChart.chart?.update();
      }, 200);
      this.lineChartData.datasets[0].data = res.prices.map((a:any)=>{
        return a[1];
      });
      this.lineChartData.labels = res.prices.map((a:any)=>{
        let date = new Date(a[0]);
        let time = date.getHours() > 12 ?
          `${date.getHours() - 12}: ${date.getMinutes()} PM` :
          `${date.getHours()}: ${date.getMinutes()} AM`
        return this.days === 1 ? time : date.toLocaleDateString();
      })
    })
  }

  public gotoHome() {
    this.router.navigate(['list'])
  }
}
