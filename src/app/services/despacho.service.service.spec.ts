import { TestBed } from '@angular/core/testing';

import { DespachoServiceService } from './despacho.service.service';

describe('DespachoServiceService', () => {
  let service: DespachoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DespachoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
