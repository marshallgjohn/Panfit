import { TestBed } from '@angular/core/testing';

import { CustomValidatorsService } from './customvalidators.service';

describe('CustomValidatorsService', () => {
  let service: CustomValidatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomValidatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
