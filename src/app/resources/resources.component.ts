import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ResourcesService } from '../core/services';
import { IResource, IOragnization } from '../core/interfaces/index';

@Component({
  moduleId: module.id,
  selector: 'cr-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
})
export class ResourcesComponent implements OnInit {

  constructor(private _rs: ResourcesService) { }

  ngOnInit() {
  }

  get organizations(): Observable<IOragnization[]> {
    return this._rs.organizations;
  }

  get resources(): Observable<IResource[]> {
    return this._rs.resources;
  }

  public openURL(url: string): void {
    window.open(url, '_blank');
  }

}
