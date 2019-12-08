import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { GridComponent } from './grid/grid.component';
import { ModalComponent } from './modal/modal.component';


@NgModule({
  declarations: [SearchComponent, GridComponent, ModalComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SearchRoutingModule
  ],
  entryComponents: [ModalComponent]
})
export class SearchModule { }
