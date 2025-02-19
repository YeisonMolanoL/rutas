import { TestBed } from '@angular/core/testing';

import { InicialesPlacaServiceService } from './iniciales-placa.service.service';

describe('InicialesPlacaServiceService', () => {
  let service: InicialesPlacaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InicialesPlacaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
