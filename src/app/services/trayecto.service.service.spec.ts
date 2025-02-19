import { TestBed } from '@angular/core/testing';

import { TrayectoServiceService } from './trayecto.service.service';

describe('TrayectoServiceService', () => {
  let service: TrayectoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrayectoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
