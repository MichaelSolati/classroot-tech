import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ClassroomsService } from '../../core/services';

@Component({
  selector: 'cr-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResultComponent implements OnInit {
  private _idSubscription: Subscription;
  private _result: Observable<any>;

  constructor(private _cs: ClassroomsService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._idSubscription = this._route.params.subscribe((params: Params) => {
      const id: string = params['id'];
      this._result = this._cs.findById(id);
    });
  }

  get result(): Observable<any> {
    return this._result;
  }
}
