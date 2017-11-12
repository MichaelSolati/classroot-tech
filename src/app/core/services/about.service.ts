import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

import { IDeveloper } from '../interfaces';

@Injectable()
export class AboutService {
  private _developers: Observable<IDeveloper[]>;

  constructor(private _fbDB: AngularFireDatabase) {
    this._fetchDevelopers();
  }

  get developers(): Observable<IDeveloper[]> {
    return this._developers;
  }

  private _fetchDevelopers() {
    this._developers = this._fbDB.list('developers', (ref: firebase.database.Reference) => {
      return ref.orderByChild('id');
    }).snapshotChanges().map((changes: any) => {
      return changes.map((c) => ({ $key: c.payload.key, ...c.payload.val() }));
    });
  }
}
