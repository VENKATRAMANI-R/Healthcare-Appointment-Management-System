import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationPanal } from './notification-panal';

describe('NotificationPanal', () => {
  let component: NotificationPanal;
  let fixture: ComponentFixture<NotificationPanal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationPanal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationPanal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
