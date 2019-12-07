import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { GridComponent } from './grid/grid.component';


@NgModule({
  declarations: [SearchComponent, GridComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SearchRoutingModule
  ]
})
export class SearchModule { }
