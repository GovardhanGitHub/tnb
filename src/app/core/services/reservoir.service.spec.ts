/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReservoirService } from './reservoir.service';

describe('Service: Reservoir', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReservoirService]
    });
  });

  it('should ...', inject([ReservoirService], (service: ReservoirService) => {
    expect(service).toBeTruthy();
  }));
});
