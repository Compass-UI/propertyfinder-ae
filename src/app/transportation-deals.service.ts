import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do'; // Just debugging
import 'rxjs/add/observable/throw';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';



@Injectable()
export class TransportationDealsService {
  private url = '/assets/mock/response.json';

  constructor(private http: Http) { }

  getDeals(fromCity: string, toCity: string): Observable<any> {
    console.log(fromCity, toCity);
    return this.http.get(this.url)
      .do(data => console.log(`Deals: ${JSON.stringify(data)}`))
      .map((res:any) => res.json());

  }
  extractData(response: Response){
    let body = response.json();
  }

}
