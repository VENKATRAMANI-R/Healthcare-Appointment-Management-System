import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorLandingPage } from './doctor-landing-page';

describe('DoctorLandingPage', () => {
  let component: DoctorLandingPage;
  let fixture: ComponentFixture<DoctorLandingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorLandingPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorLandingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
