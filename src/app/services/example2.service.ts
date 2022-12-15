import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Example2Service {

  constructor() { }

  shareDateSubject = new BehaviorSubject<string>('');
  shareData$ = this.shareDateSubject as Observable<string>;

  shareDataToComponent(value: string) {
    this.shareDateSubject.next(value);
  }
}
