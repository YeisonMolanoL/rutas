import { TestBed } from '@angular/core/testing';

import { ParaderoServiceService } from './paradero.service.service';

describe('ParaderoServiceService', () => {
  let service: ParaderoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParaderoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
