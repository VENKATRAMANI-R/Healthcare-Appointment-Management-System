import { TestBed } from '@angular/core/testing';

import { DoctorAvailablityService } from './doctor-availablity-service';

describe('DoctorAvailablityService', () => {
  let service: DoctorAvailablityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorAvailablityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
