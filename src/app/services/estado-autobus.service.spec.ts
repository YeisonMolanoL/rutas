import { TestBed } from '@angular/core/testing';

import { EstadoAutobusService } from './estado-autobus.service';

describe('EstadoAutobusService', () => {
  let service: EstadoAutobusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoAutobusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
