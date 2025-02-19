import { TestBed } from '@angular/core/testing';

import { AutobusServiceService } from './autobus.service.service';

describe('AutobusServiceService', () => {
  let service: AutobusServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutobusServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
