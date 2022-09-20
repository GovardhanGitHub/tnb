import { TestBed } from '@angular/core/testing';

import { ReservoirUpdateService } from './reservoir-update.service';

describe('ReservoirUpdateService', () => {
  let service: ReservoirUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservoirUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
