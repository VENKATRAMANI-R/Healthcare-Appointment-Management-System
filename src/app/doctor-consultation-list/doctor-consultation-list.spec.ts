import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorConsultationList } from './doctor-consultation-list';

describe('DoctorConsultationList', () => {
  let component: DoctorConsultationList;
  let fixture: ComponentFixture<DoctorConsultationList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorConsultationList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorConsultationList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
