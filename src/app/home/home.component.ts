import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'cr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor(private _snackbar: MatSnackBar) { }

  ngOnInit() { }
}
