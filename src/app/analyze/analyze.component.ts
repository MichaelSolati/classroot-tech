import { Component, OnInit, ViewEncapsulation, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { UploaderService, QuestionsService } from '../core/services';
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
  private _questionnaire: any = {};

  constructor(private _snackbar: MatSnackBar, private _qs: QuestionsService, private _router: Router, private _us: UploaderService) { }

  ngOnInit() {
  }

  get count(): number {
    return this._count;
  }

  get photo(): string {
    return this._photo64;
  }

  get questions(): Observable<any[]> {
    return this._qs.questions;
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
      this._us.uploadFile(this._photo, this._questionnaire, (err: Error, success: string) => {
        if (err) {
          this._snackbar.open(err.message, null, { duration: 3000 });
        } else {
          console.log(success);
          this._router.navigate(['/', 'analyze', success]);
        }
      });
    }
  }

  public takePicture(): void {
    this.fileInput.nativeElement.click();
  }
}
