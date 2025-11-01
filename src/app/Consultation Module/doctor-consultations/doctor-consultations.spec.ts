import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorConsultations } from './doctor-consultations';

describe('DoctorConsultations', () => {
  let component: DoctorConsultations;
  let fixture: ComponentFixture<DoctorConsultations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorConsultations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorConsultations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
