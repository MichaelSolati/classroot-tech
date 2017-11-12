import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

import { IResource, IOragnization, IQuestion } from '../interfaces';

@Injectable()
export class ResourcesService {
  private _resources: Observable<IResource[]>;
  private _organizations: Observable<IOragnization[]>;
  private _questions: Observable<IQuestion[]>;

  constructor(private _fbDB: AngularFireDatabase) {
    this._fetchOrganizations();
    this._fetchResources();
    this._fetchQuestions();
   }

  get resources(): Observable<IResource[]> {
    return this._resources;
  }

  get organizations(): Observable<IOragnization[]> {
    return this._organizations;
  }

  get questions(): Observable<IQuestion[]> {
    return this._questions;
  }

  private _fetchOrganizations(): void {
    this._organizations = this._fbDB.list('organizations', (ref: firebase.database.Reference) => {
      return ref.orderByChild('id');
    }).snapshotChanges().map((changes: any) => {
      return changes.map((c) => ({ $key: c.payload.key, ...c.payload.val() }));
    });
  }

  private _fetchQuestions(): void {
    this._questions = this._fbDB.list('questions', (ref: firebase.database.Reference) => {
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
