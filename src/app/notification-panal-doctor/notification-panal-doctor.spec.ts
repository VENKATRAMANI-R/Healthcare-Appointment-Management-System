import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationPanalDoctor } from './notification-panal-doctor';

describe('NotificationPanalDoctor', () => {
  let component: NotificationPanalDoctor;
  let fixture: ComponentFixture<NotificationPanalDoctor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationPanalDoctor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationPanalDoctor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
