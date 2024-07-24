import {Injectable, signal} from '@angular/core';
import {booklet} from "./booklet";

@Injectable({
  providedIn: 'root'
})
export class AppStoreService {
  readonly booklet = booklet;
  bundeslandId = signal('');
}
