import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAvailablityManagement } from './doctor-availablity-management';

describe('DoctorAvailablityManagement', () => {
  let component: DoctorAvailablityManagement;
  let fixture: ComponentFixture<DoctorAvailablityManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorAvailablityManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorAvailablityManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
