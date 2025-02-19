import { TestBed } from '@angular/core/testing';

import { RutasGuardService } from './rutas-guard.service';

describe('RutasGuardService', () => {
  let service: RutasGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RutasGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
