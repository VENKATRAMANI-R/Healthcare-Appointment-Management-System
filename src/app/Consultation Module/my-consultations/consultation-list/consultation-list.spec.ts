import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationList } from './consultation-list';

describe('ConsultationList', () => {
  let component: ConsultationList;
  let fixture: ComponentFixture<ConsultationList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultationList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultationList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
