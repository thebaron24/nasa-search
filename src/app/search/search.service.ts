import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, debounceTime, distinctUntilChanged,  switchMap, tap } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  //https://images-api.nasa.gov/search?q=apollo%2011&description=moon%20landing&media_type=image

  baseUrl: string = 'https://images-api.nasa.gov/';
  queryUrl: string = 'search?q=';
  paramsUrl: string = '&media_type=image';

  constructor(public http: HttpClient, public loading: LoadingService) { }

  public get(term: String): Observable<any> {

  	this.loading.enable();

    return this.http.get(this.baseUrl + this.queryUrl + term + this.paramsUrl).pipe(
    	tap( value => {
    		this.loading.disable();
    	})
    );
  }
}
