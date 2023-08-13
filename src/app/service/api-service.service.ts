import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http : HttpClient) { }

  public getAllCryptoCurrency(currency:string){
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&sparkline=false`);

  }
  public getCryptoGraphCurrencyData(cryptoId:string, currency:string, days: number){
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=${currency}&days=${days}`)
  }
  public getCryptoCurrencyById(cryptoId:string){
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/${cryptoId}`)
  }
}
