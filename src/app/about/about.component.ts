import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'cr-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {
  }

  public goBack(): void {
    this._location.back();
  }

}
