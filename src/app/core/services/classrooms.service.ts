import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ClassroomsService {

  constructor(private _fbDB: AngularFireDatabase) { }

  public findById(id: string): Observable<any> {
    return this._fbDB.object('/uploads/' + id).valueChanges().map((event: any) => ({ $key: id, ...event }));
  }
}
