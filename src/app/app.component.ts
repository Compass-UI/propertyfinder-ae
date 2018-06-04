import { Component, OnInit } from '@angular/core';
import { TransportationDealsService } from './transportation-deals.service';
import { Http } from '@angular/http';

import {FormGroup, FormControl, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  private trips: any;
  private searchForm: FormGroup;

  constructor(
    private http: Http,
    private fb: FormBuilder,
    private transportationDealsService: TransportationDealsService){

  }

  search(){
    console.log(this.searchForm);
  }
  getDeals(){
    console.log('getDeals');
    this.transportationDealsService.getDeals("London", "Paris")
      .subscribe(
        deals => {
          console.log(JSON.stringify(deals));
          this.onDealRetrieved(deals /*deal*/)
          this.trips = deals;
        }
    )
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      fromCity: new FormControl(),
      toCity: new FormControl()
    });
  }
  
  onDealRetrieved(deals /*deals: IDeals*/): void {
    console.log(' D E A L S deals.deals');
    this.searchForm.patchValue({ // TODO
      // fromCity: this.deals.fromCity,
      // toCity: this.deals.toCity
    });
  }

}
