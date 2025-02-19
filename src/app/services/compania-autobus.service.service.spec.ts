import { TestBed } from '@angular/core/testing';

import { CompaniaAutobusServiceService } from './compania-autobus.service.service';

describe('CompaniaAutobusServiceService', () => {
  let service: CompaniaAutobusServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompaniaAutobusServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
