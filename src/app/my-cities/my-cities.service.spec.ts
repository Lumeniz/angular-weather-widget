import { TestBed, inject } from '@angular/core/testing';

import { MyCitiesService } from './my-cities.service';

describe('MyCitiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyCitiesService]
    });
  });

  it('should be created', inject([MyCitiesService], (service: MyCitiesService) => {
    expect(service).toBeTruthy();
  }));
});
