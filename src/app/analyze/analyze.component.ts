import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { UploaderService } from '../core/services';

import { SelectComponent } from './select/select.component';

@Component({
  selector: 'cr-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss'],
})
export class AnalyzeComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  private _photo: File;
  private _photo64: string;
  private _processing: boolean;
  private _type: string;

  constructor(private _snackbar: MatSnackBar, private _router: Router, private _us: UploaderService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  get photo(): string {
    return this._photo64;
  }

  get processing(): boolean {
    return this._processing;
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
          this._router.navigate(['/', 'analyze', success]);
        }
      });
    }
  }

  public takePicture(): void {
    this.fileInput.nativeElement.click();
  }
}
