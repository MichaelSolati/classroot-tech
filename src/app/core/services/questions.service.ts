import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class QuestionsService {
  private _questions: Observable<any[]>;

  constructor(private _fbDB: AngularFireDatabase) {
    this._questions = this._fbDB.list('questions').snapshotChanges().map(changes => {
      return changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }));
    });
  }

  get questions(): Observable<any[]> {
    return this._questions;
  }
}
