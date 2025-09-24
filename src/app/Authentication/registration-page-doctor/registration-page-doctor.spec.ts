import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationPageDoctor } from './registration-page-doctor';

describe('RegistrationPageDoctor', () => {
  let component: RegistrationPageDoctor;
  let fixture: ComponentFixture<RegistrationPageDoctor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationPageDoctor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationPageDoctor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
