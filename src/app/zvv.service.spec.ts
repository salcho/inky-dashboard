import { TestBed } from '@angular/core/testing';

import { ZvvService } from './zvv.service';

describe('ZvvService', () => {
  let service: ZvvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZvvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
