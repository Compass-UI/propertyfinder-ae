import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { TransportationDealsService } from '../transportation-deals.service';
import { Http } from '@angular/http';
import { MatTableDataSource } from '@angular/material';
import { ShortestPathModule, NodeVertex, Vertex, Dijkstra } from '../shortest-path/shortest-path.module';

@Component({
  selector: 'app-shortest-path',
  templateUrl: './shortest-path.component.html',
  styleUrls: ['./shortest-path.component.css']
})
export class ShortestPathComponent implements OnInit {
  public searchForm: FormGroup;  
  private trips: any;
  public shortestTrips: any;
  private cheapestShortest: number = 0;
  cityMessage: string;
  private validationMessages: {
    required: 'Please enter a valid city name'
  }
  private realDijkstra: any;

  constructor(
    private http: Http,
    private fb: FormBuilder,
    private shortestPath: ShortestPathModule,
    private transportationDealsService: TransportationDealsService){
  }
  myControl: FormControl = new FormControl();
  options = [ /** TODO: Dynamically populate - not asked */
    'London',
    'Paris',
    'Moscow',
    'Madrid',
    'Amsterdam',
    'Warsaw',
    'Stockholm',
    'Kiev',
    'Istanbul'
   ];
  filteredOptions: Observable<string[]>;
  ngOnInit() {
    this.searchForm = this.fb.group({
      fromCity: ['Dubai', [Validators.minLength(3)]],
      toCity: ['', [Validators.minLength(3)]],
      cheapestShortest: ['1']
    });
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }

  favoritePath: string;

  shortestCheapest = [
    'Shortest',
    'Cheapest',
  ];
  pathChoice: string;
  cheapShort = [
    'Cheapest',
    'Shortest'
  ];

  getDeals(){
    console.log(this.searchForm.controls.fromCity.value);
    console.log(this.searchForm.controls.toCity.value);
    this.transportationDealsService.getDeals("London", "Paris")
      .subscribe(
        deals => {
          // console.log(JSON.stringify(deals));
          this.onDealRetrieved(deals /*deal*/)
          this.trips = deals;
          // this.shortestTrips = deals;
          this.shortestTrips = ["London", "Amsterdam", "Warsaw", "Stockholm", "Moscow", "Kiev", "Istanbul", "1500"];
          console.log(this.shortestTrips);
        }
    )
  }
  search(){
    console.log(this.searchForm);
  }
  searchPath(): Array<string> {
    let fromCity = this.searchForm.controls.fromCity.value;
    let toCity = this.searchForm.controls.toCity.value;
    console.log(fromCity);
    console.log(toCity);

    this.transportationDealsService.getDeals("London", "Paris") // TO DO
      .subscribe(
        (deals) => {
            this.onDealsRetrieved(deals);
            console.log(this.realDijkstra.findShortestWay("London", "Amsterdam"));  
            console.log(this.realDijkstra.findShortestWay("London", "Paris"));
            console.log(this.realDijkstra.findShortestWay("London", "London")); // Edge case
            console.log(this.realDijkstra.findShortestWay("London", "Istanbul")); // Good example
            /**
             * (8) ["London", "Amsterdam", "Warsaw", "Stockholm", "Moscow", "Kiev", "Istanbul", "1500"]0: "London"1: "Amsterdam"2: "Warsaw"3: "Stockholm"4: "Moscow"5: "Kiev"6: "Istanbul"7: "1500"length: 8__proto__: Array(0)
             */
            console.log(this.realDijkstra.findShortestWay("London", "Amsterdam")); // Test
            console.log(this.realDijkstra.findShortestWay("London", "Warsaw")); // Test
            console.log(this.realDijkstra.findShortestWay("London", "Stockholm")); // Test
            console.log(this.realDijkstra.findShortestWay("London", "Moscow")); // Test
            console.log(this.realDijkstra.findShortestWay("London", "Kiev")); // Test
            console.log(this.realDijkstra.findShortestWay("London", "Istanbul")); // Test
            // console.log(this.realDijkstra.findShortestWay("London", "NonExisting")); // Error: Edge case
            this.trips = deals;
            console.log(this.shortestTrips);
            return this.shortestTrips = this.realDijkstra.findShortestWay(fromCity, toCity);
          },
          (error: any) => console.log(error)
      )
      return ["London", "Amsterdam", "285"];
  }
  sampleData(){
    this.searchForm.patchValue({
      fromCity: 'London',
      toCity: 'Paris',
    })
  }
  onDealsRetrieved(deals){
    this.addVertices(deals.deals);      
  }
  addVertices(deals): any {
    this.realDijkstra = new Dijkstra();      
    let numberOfDeals = 0;
    /**
    * Add all Verteces ( cities ) to graph
    */
    let departureArray = [];
    let curCity = '';
    let prevCity = '';

    for (let e of deals) {
      curCity = e.departure;
      if (curCity == prevCity || prevCity == '') {
          departureArray.push({ nameOfVertex: e.arrival, weight: (parseInt(e.duration.h) * 60 + parseInt(e.duration.m)) });
      }
      if (curCity != prevCity) { departureArray = []; }
      prevCity = curCity;    
      if(this.pathChoice == 'Cheapest'){
        console.log('Searching for Cheapest');
      }else if(this.pathChoice == 'Shortest'){
        console.log('Searching for Shortest');
      }
      this.realDijkstra.addVertex(new Vertex(e.departure, departureArray, e.cost * (1 - e.discount / 100)));
      numberOfDeals++;      
      }
  }
  showTotal(trip: string): any {
    return ((Math.floor(parseInt(trip) / 60) + 'h ' + parseInt(trip)%60 + 'min'));
  }
  reset(){
    this.searchForm.patchValue({
      fromCity: '',
      toCity: '',
    });
    this.shortestTrips = null;
  }
  onDealRetrieved(deals /*deals: IDeals*/): void {
    console.log(' D E A L S deals.deals');
    this.searchForm.patchValue({ // TODO
      // fromCity: this.deals.fromCity,
      // toCity: this.deals.toCity
    });
  }
  filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
  }
}