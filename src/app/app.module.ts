import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ShortestPathComponent } from './shortest-path/shortest-path.component';
import { MaterialModule } from './material/material.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatSidenavModule, MatCardModule, MatFormField, MatFormFieldModule, MatProgressSpinnerModule } from '@angular/material';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TransportationDealsService } from './transportation-deals.service';
import { ShortestPathModule } from './shortest-path/shortest-path.module';

@NgModule({
  declarations: [
    AppComponent,
    ShortestPathComponent,
    ToolbarComponent,
    SidenavComponent,
    AutoCompleteComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    MatSidenavModule,
    FormsModule, 
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    HttpModule,
    ShortestPathModule
  ],
  providers: [
    TransportationDealsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
