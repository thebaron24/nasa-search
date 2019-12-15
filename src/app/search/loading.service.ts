import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

	private loading$: BehaviorSubject<Boolean> = new BehaviorSubject(true);

  	constructor() { }

	public get(): Boolean {
		return this.loading$.value;
	}

	private set(value: Boolean){
		this.loading$.next(value);
	}

	public enable(): void {
		this.set(true);
	}

	public disable(): void {
		this.set(false);
	}

	public getSubscribable(): BehaviorSubject<Boolean> {
		return this.loading$;
	}

}
