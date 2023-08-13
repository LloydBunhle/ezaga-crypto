import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ApiServiceService} from "../service/api-service.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-crypto-list',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.css']
})
export class CryptoListComponent implements OnInit {
  public currency: string = 'ZAR'
  public dataSource!: MatTableDataSource<any>;
  public displayedColumns: string[] = ['symbol', 'current_price', 'price_change_percentage_24h', 'market_cap'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private api: ApiServiceService, private router : Router) {
  }
  ngOnInit() {
    this.getAllData()
  }

  public getAllData() {
    this.api.getAllCryptoCurrency(this.currency)
      .subscribe(res => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      })
  }
  public gotoDetails(row: any) {
    this.router.navigate(['details',row.id])
  }
}
