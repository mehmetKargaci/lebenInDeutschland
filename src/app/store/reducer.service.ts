import {inject, Injectable, OnInit} from '@angular/core';
import {AppStoreService} from "./app-store.service";

@Injectable({
  providedIn: 'root'
})
export class ReducerService implements OnInit {
  appStore = inject(AppStoreService);
  bookletData = this.appStore.booklet;

  ngOnInit() {
  }


}
