import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { error } from 'util';

@Injectable()
export class UploaderService {
  private _storageRef: any;

  constructor(private _fbDB: AngularFireDatabase) {
    this._storageRef = firebase.storage();
  }

  public uploadFile(file: File): void {
    if (file) {
      this._fbDB.list('pictures')
        .push({
          uploadedOn: new Date().getTime()
        }).then((result) => {
          this._storageRef.ref('pictures/' + result.key + '-' + file.name)
            .put(file)
            .then((snapshot) => {
              this._fbDB.object('pictures/' + result.key).update({
                photoUrl: snapshot.downloadURL
              });
            });
        });
    }
  }
}
