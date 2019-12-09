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
import { ActivatedRoute } from "@angular/router";
import { Routes, Router } from '@angular/router';
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
  searchTerm: String = '';

  constructor(public search: SearchService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {

    const query = this.route.snapshot.queryParamMap.get("q");
    if(query) this.searchTerm$.next(query);

    this.subscriptions.queryMap = this.route.queryParams.subscribe(params => {
        const q = params['q'];
        if(q) this.searchTerm$.next(q);
    });
  }

  ngAfterViewInit(): void {
    this.subscriptions.grid = this.searchTerm$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(term => {
          this.searchTerm = term;
          return this.search.get(term);
        })
      )
      .subscribe(grid => {
        if (grid) {
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { q: this.searchTerm },
            queryParamsHandling: 'merge'
          });
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
