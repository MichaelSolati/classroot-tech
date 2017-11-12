import { Component, OnInit, ViewEncapsulation, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';

import { UploaderService } from '../core/services';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'cr-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AnalyzeComponent implements OnInit {
  private _count = 0;
  @ViewChild('fileInput') fileInput: ElementRef;
  private _photo: File;
  private _photo64: string;
  private _processing: boolean;
  private _questionnaire: any = {};

  constructor(
    private _location: Location, private _snackbar: MatSnackBar,
    private _router: Router, private _us: UploaderService
  ) { }

  ngOnInit() {
  }

  get photo(): string {
    return this._photo64;
  }

  get processing(): boolean {
    return this._processing;
  }

  public goBack(): void {
    this._location.back();
  }

  public next(value: boolean, key: string): void {
    this._questionnaire[key] = value;
    this._count += 1;
  }

  public selectPhoto(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      if (!file.type.includes('image')) { return; }
      this._photo = file;
      const reader = new FileReader();
      reader.readAsDataURL(this._photo);
      reader.onload = () => this._photo64 = reader.result;
    }
  }

  public submit(): void {
    if (this._photo) {
      this._processing = true;
      this._us.uploadFile(this._photo, this._questionnaire, (err: Error, success: string) => {
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
