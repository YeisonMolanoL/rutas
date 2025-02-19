import { TestBed } from '@angular/core/testing';

import { EntidadEmpresaServiceService } from './entidad-empresa.service.service';

describe('EntidadEmpresaServiceService', () => {
  let service: EntidadEmpresaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntidadEmpresaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
