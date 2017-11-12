import { TestBed, inject } from '@angular/core/testing';

import { ClassroomsService } from './classrooms.service';

describe('ClassroomsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClassroomsService]
    });
  });

  it('should be created', inject([ClassroomsService], (service: ClassroomsService) => {
    expect(service).toBeTruthy();
  }));
});
