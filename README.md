# Uae Property UI

## Features

* TypeScript is ued ← better coding / debugging experience / modular
* Angular 2+ used
* Fast Dijkstras algorithm for shoretest path ←
    ** worst case:
    ** O( |E| + |V| log|V| )
* For great UI experience Angular Material is used
    ** Mobile enabled
    ** Double tab on field to see zoom effect on iPhone
    ** Pagination for long search results ( not fully implemented - not asked )
    ** Calendar control for trip dates ( not fully implemented - not asked )
    ** Depending on type of transportation used visual indicator plane/car/train will be displayed ( not fully implemented - not asked )
* Basic validation
    ** Required fields
    ** Search disabled if not valid fields
    ** Minimum length for Departure and Arrival cities
    ** Mock default value based on user’s location ( not fully implemented - not asked )
* Reusable service for loading deals and shortest path algorithm

***

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

---
## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

***

## Angular Material

Requires rxjs

`david 🌴 : npm i rxjs`

`npm install --save @angular/material @angular/cdk`
[https://material.angular.io/guide/getting-started](https://material.angular.io/guide/getting-started)
