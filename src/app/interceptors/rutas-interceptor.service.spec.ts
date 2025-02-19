import { TestBed } from '@angular/core/testing';

import { RutasInterceptorService } from './rutas-interceptor.service';

describe('RutasInterceptorService', () => {
  let service: RutasInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RutasInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
