import {inject, Injectable, OnInit} from '@angular/core';
import {AppStoreService} from "./app-store.service";

@Injectable({
  providedIn: 'root'
})
export class ReducerService implements OnInit {
  appStore = inject(AppStoreService);

  ngOnInit() {
  }

  setBundeslandId(bundeslandID: string) {
  this.appStore.bundeslandId.set(bundeslandID);
  }
}
