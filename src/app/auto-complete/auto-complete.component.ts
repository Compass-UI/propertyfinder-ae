/**
 * @title Highlight the first autocomplete option
 */

import { Component, OnInit } from '@angular/core';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent implements OnInit {
  fromControl: FormControl = new FormControl();
  toControl: FormControl = new FormControl();
  options = ['London', 'Paris', 'Amsterdam'];
  filteredOptions: Observable<string[]>;


  constructor() { }

  ngOnInit() {
    this.filteredOptions = this.fromControl.valueChanges.pipe(
      startWith(''),
      map(val => this.filter(val))
    );

    this.filteredOptions = this.toControl.valueChanges.pipe(
      startWith(''),
      map(val => this.filter(val))
    );
  }

  filter(val: string): string[] {
    return this.options.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

}



/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */