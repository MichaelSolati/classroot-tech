import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'cr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor(private _router: Router, private _snackbar: MatSnackBar) { }

  ngOnInit() { }

  public goTo(page: string): void {
    this._router.navigate(['/', page]);
  }
}
