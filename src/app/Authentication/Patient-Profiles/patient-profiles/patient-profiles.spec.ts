import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientProfiles } from './patient-profiles';

describe('PatientProfiles', () => {
  let component: PatientProfiles;
  let fixture: ComponentFixture<PatientProfiles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientProfiles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientProfiles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
