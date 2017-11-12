import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class UploaderService {
  private _storageRef: any;

  constructor(private _fbDB: AngularFireDatabase) {
    this._storageRef = firebase.storage();
  }

  public uploadFile(file: File, type: string, callback: any): void {
    if (file) {
      this._fbDB.list('upload').push({
        type: type,
      }).then((result) => {
        this._storageRef
          .ref('upload/' + result.key + '-' + file.name)
          .put(file).then((snapshot) => {
            this._fbDB
              .object('upload/' + result.key).update({
                photoUrl: snapshot.downloadURL
              }).then(() => {
                this._fbDB.object('analyze/' + result.key).set({
                  type: type,
                  photoUrl: snapshot.downloadURL
                });
                callback(null, result.key);
              }, (err: Error) => { callback(err, null); });
          });
      }, (err: Error) => { callback(err, null); });
    } else {
      callback(new Error('No file found'), null);
    }
  }
}
