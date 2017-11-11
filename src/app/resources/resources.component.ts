import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'cr-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResourcesComponent implements OnInit {

  dummyResources: any[] = [{
      'title': 'Dummy Data One',
      'content': 'Dummy Content',
      'url': 'Https/dummycontent.url'
    },
    {
      'title:': 'How to make your classroom nicer, right?',
      'content': 'wompwomp womp WOMP!',
      'url': 'https/moredummydata'
    },
    {
      'title': 'Title',
      'content': 'Content',
      'url': 'url',
    }];

  constructor() { }

  ngOnInit() {
  }

}
