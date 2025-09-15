import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Excellence } from './excellence';

describe('Excellence', () => {
  let component: Excellence;
  let fixture: ComponentFixture<Excellence>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Excellence]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Excellence);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
