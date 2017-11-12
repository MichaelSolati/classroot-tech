import { Component, OnInit, OnDestroy, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { UploaderService, ClassroomsService } from '../core/services';

import { SelectComponent } from './select/select.component';

@Component({
  selector: 'cr-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss'],
})
export class AnalyzeComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') fileInput: ElementRef;
  private _photo: File;
  private _photo64: string;
  private _processing: boolean;
  private _result: any;
  private _resultSub: Subscription;
  private _type: string;

  constructor(
    private _snackbar: MatSnackBar, private _cs: ClassroomsService, private _us: UploaderService,
    public dialog: MatDialog, private _zone: NgZone
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this._resultSub) { this._resultSub.unsubscribe(); }
  }

  get photo(): string {
    return this._photo64;
  }

  get processing(): boolean {
    return this._processing;
  }

  get result(): any {
    return this._result;
  }

  private _openDialog(): void {
    const dialogRef = this.dialog.open(SelectComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe((result?: string) => {
      this._type = (result || 'Classroom');
    });
  }

  public selectPhoto(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      if (!file.type.includes('image')) { return; }
      this._photo = file;
      const reader = new FileReader();
      reader.readAsDataURL(this._photo);
      reader.onload = () => this._photo64 = reader.result;
      this._openDialog();
    }
  }

  public submit(): void {
    if (this._photo) {
      this._processing = true;
      this._us.uploadFile(this._photo, this._type, (err: Error, success: string) => {
        if (err) {
          this._processing = false;
          this._snackbar.open(err.message, null, { duration: 3000 });
        } else {
          this._zone.run(() => {
            this._resultSub = this._cs.findById(success).subscribe((val) => this._result = val);
          });
        }
      });
    }
  }

  public takePicture(): void {
    this.fileInput.nativeElement.click();
  }
}
