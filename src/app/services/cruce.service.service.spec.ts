import { TestBed } from '@angular/core/testing';

import { CruceServiceService } from './cruce.service.service';

describe('CruceServiceService', () => {
  let service: CruceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CruceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
