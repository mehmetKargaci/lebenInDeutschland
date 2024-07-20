import { Injectable } from '@angular/core';
import {booklet} from "./booklet";

@Injectable({
  providedIn: 'root'
})
export class AppStoreService {

  readonly booklet = booklet;
}
