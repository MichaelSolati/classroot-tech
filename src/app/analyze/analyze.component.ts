import { Component, OnInit, ViewEncapsulation, Input, ViewChild, ElementRef } from '@angular/core';

import { UploaderService } from '../core/services';

@Component({
  selector: 'cr-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AnalyzeComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  private _photo: File;
  private _photo64: string;

  constructor(private _us: UploaderService) { }

  ngOnInit() {
  }

  get photo(): string {
    return this._photo64;
  }

  public selectPhoto(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this._photo = file;
      const reader = new FileReader();
      reader.readAsDataURL(this._photo);
      reader.onload = () => this._photo64 = reader.result;
    }
  }

  public submit(): void {
    if (this._photo) {
      this._us.uploadFile(this._photo);
    }
  }

  public takePicture(): void {
    this.fileInput.nativeElement.click();
  }
}
