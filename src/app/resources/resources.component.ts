import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ResourcesService } from '../core/services';
import { IResource, IOragnization } from '../core/interfaces/index';

@Component({
  selector: 'cr-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResourcesComponent implements OnInit {
  // private _resources: Observable<IResource>;
  // private _organizations: Observable<IOragnization>;

  dummyResources: IResource[] = [{
    'title': 'Dummy Data One',
    'content': 'Dummy Content',
    'url': 'Https/dummycontent.url'
  },
  {
    'title': 'Test',
    'content': 'wompwomp womp WOMP!',
    'url': 'https/moredummydata'
  },
  {
    'title': 'Title',
    'content': 'Content',
    'url': 'url',
  }];

  dummyOrganizations: IOragnization[] = [{
    'altimg': 'Google Tech Corp',
    'img': 'http:/google',
    'url': 'www.google.com'
  },
  {
    'altimg': 'Google Tech Corp',
    'img': 'http:/google',
    'url': 'www.google.com'
  },
  {
    'altimg': 'Google Tech Corp',
    'img': 'http:/google',
    'url': 'www.google.com'
  }];

  constructor(private _rs: ResourcesService) { }

  ngOnInit() {
  }

  get organizations(): Observable<IOragnization[]> {
    return this._rs.organizations;
  }
  get resources(): Observable<IResource[]> {
    return this._rs.resources;
  }

}
