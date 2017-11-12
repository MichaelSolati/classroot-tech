import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AboutService } from '../core/services/about.service';
import { IDeveloper } from '../core/interfaces';

@Component({
  selector: 'cr-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {

  constructor(private _as: AboutService) { }

  ngOnInit() {
  }

  get developers(): Observable<IDeveloper[]> {
    return this._as.developers;
  }

  public openTwitter(username: string): void {
    window.open('https://twitter.com/' + username, '_blank');
  }

  public openGitHub(username: string): void {
    window.open('https://github.com/' + username, '_blank');
  }

  public openDevPost(username: string): void {
    window.open('https://devpost.com/' + username, '_blank');
  }

  public openLinkedIn(username: string): void {
    window.open('https://www.linkedin.com/in/' + username, '_blank');
  }
}
