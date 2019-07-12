import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places: Place[] = [
    new Place('p1', 'Manhatan Mansion', 'In the heart of New York City', )
  ];
  get places() {
    return [...this._places];
  }

  constructor() { }
}
