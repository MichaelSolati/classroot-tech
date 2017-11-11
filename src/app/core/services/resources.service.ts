import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

import { IResource, IOragnization } from '../interfaces';

@Injectable()
export class ResourcesService {
  private _resources: Observable<IResource[]>;
  private _organizations: Observable<IOragnization[]>;

  constructor(private _fbDB: AngularFireDatabase) {
    this._fetchOrganizations();
    this._fetchResources();
   }

  get resources(): Observable<IResource[]> {
    return this._resources;
  }

  get organizations(): Observable<IOragnization[]> {
    return this._organizations;
  }

  private _fetchOrganizations(): void {
    this._organizations = this._fbDB.list('organizations', (ref: firebase.database.Reference) => {
      return ref.orderByChild('id');
    }).snapshotChanges().map((changes: any) => {
      return changes.map((c) => ({ $key: c.payload.key, ...c.payload.val() }));
    });
  }

  private _fetchResources(): void {
    this._resources = this._fbDB.list('resources', (ref: firebase.database.Reference) => {
      return ref.orderByChild('id');
    }).snapshotChanges().map((changes: any) => {
      return changes.map((c) => ({ $key: c.payload.key, ...c.payload.val() }));
    });
  }

}
