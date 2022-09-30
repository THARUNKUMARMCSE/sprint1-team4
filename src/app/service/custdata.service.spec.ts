import { TestBed } from '@angular/core/testing';

import { CustdataService } from './custdata.service';

describe('CustdataService', () => {
  let service: CustdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
