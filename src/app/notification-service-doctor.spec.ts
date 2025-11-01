import { TestBed } from '@angular/core/testing';

import { NotificationServiceDoctor } from './notification-service-doctor';

describe('NotificationServiceDoctor', () => {
  let service: NotificationServiceDoctor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationServiceDoctor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
