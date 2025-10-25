import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorProfiles } from './doctor-profiles';

describe('DoctorProfiles', () => {
  let component: DoctorProfiles;
  let fixture: ComponentFixture<DoctorProfiles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorProfiles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorProfiles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
