import { TestBed } from '@angular/core/testing';

import { FormaJuridicaServiceService } from './forma-juridica.service.service';

describe('FormaJuridicaServiceService', () => {
  let service: FormaJuridicaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormaJuridicaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
