import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ResourcesService } from '../core/services';
import { IResource, IOragnization, IQuestion } from '../core/interfaces/index';

@Component({
  selector: 'cr-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss'],
})
export class LearnComponent implements OnInit {

  constructor(private _rs: ResourcesService) { }

  ngOnInit() {
  }

  get organizations(): Observable<IOragnization[]> {
    return this._rs.organizations;
  }

  get questions(): Observable<IQuestion[]> {
    return this._rs.questions;
  }

  get resources(): Observable<IResource[]> {
    return this._rs.resources;
  }

  public openURL(url: string): void {
    window.open(url, '_blank');
  }
}
