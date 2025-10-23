import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginLanding } from './login-landing';

describe('LoginLanding', () => {
  let component: LoginLanding;
  let fixture: ComponentFixture<LoginLanding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginLanding]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginLanding);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
