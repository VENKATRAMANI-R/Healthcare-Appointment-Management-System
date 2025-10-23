import { TestBed } from '@angular/core/testing';

import { RegistrationpageService } from './registrationpage-service';

describe('RegistrationpageService', () => {
  let service: RegistrationpageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrationpageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
