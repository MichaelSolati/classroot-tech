import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import { AboutService } from '../core/services/about.service';
import { IDeveloper } from '../core/interfaces';

@Component({
  selector: 'cr-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {

  constructor(private _as: AboutService, private _location: Location) { }

  ngOnInit() {
  }

  get developers(): Observable<IDeveloper[]> {
    return this._as.developers;
  }

  public goBack(): void {
    this._location.back();
  }
<<<<<<< HEAD

  public openWebsite(url: string): void {
    window.open(url, '_blank');
  }

=======
>>>>>>> dev
}
