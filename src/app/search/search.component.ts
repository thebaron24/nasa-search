import {
  Component,
  ViewChild,
  OnInit,
  AfterViewInit,
  OnDestroy
} from "@angular/core";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
  skipWhile
} from "rxjs/operators";
import { SearchService } from "./search.service";
import { GridComponent } from "./grid/grid.component";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

	name = "NASA image search";
  @ViewChild(GridComponent, { static: false }) grid!: GridComponent;
  subscriptions: any = {};
  searchTerm$ = new BehaviorSubject<string>("nebula");

  constructor(public search: SearchService) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.subscriptions.grid = this.searchTerm$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(term => {
          return this.search.get(term);
        })
      )
      .subscribe(grid => {
        console.log(grid);
        if (grid) {
          this.grid.data = grid;
          this.grid.show = true;
        }
      });
  }

  ngOnDestroy(): void {
    Object.keys(this.subscriptions).forEach(key =>
      this.subscriptions[key].unsubscribe()
    );
  }

}
