import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

import { IResource, IOragnization } from '../interfaces';

@Injectable()
export class ResourcesService {
  private _resources: Observable<IResource[]>;
  private _organizations: Observable<IOragnization[]>;

  constructor(private _fbDB: AngularFireDatabase) { }

  get resources(): Observable<IResource[]> {
    return this._resources;
  }

  get organizations(): Observable<IOragnization[]> {
    return this._organizations;
  }

}
