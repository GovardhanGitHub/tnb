/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReservoirAuthService } from './reservoir-auth.service';

describe('Service: ReservoirAuth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReservoirAuthService]
    });
  });

  it('should ...', inject([ReservoirAuthService], (service: ReservoirAuthService) => {
    expect(service).toBeTruthy();
  }));
});
