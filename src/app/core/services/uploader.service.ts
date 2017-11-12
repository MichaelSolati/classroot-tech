import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class UploaderService {
  private _storageRef: any;

  constructor(private _fbDB: AngularFireDatabase) {
    this._storageRef = firebase.storage();
  }

  public uploadFile(file: File, questionnaire: any, callback: any): void {
    if (file) {
      const date: number = new Date().getTime();
      this._fbDB.list('classroom').push({
        questionnaire: questionnaire,
        uploadedOn: date
      }).then((result) => {
        this._storageRef
          .ref('classroom/' + result.key + '-' + file.name)
          .put(file).then((snapshot) => {
            this._fbDB
              .object('classroom/' + result.key).update({
                photoUrl: snapshot.downloadURL
              }).then(() => {
                this._fbDB.object('analyze/' + result.key).set({
                  questionnaire: questionnaire,
                  uploadedOn: date,
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
