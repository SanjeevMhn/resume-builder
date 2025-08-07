import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeTemplate01 } from './resume-template-01';

describe('ResumeTemplate01', () => {
  let component: ResumeTemplate01;
  let fixture: ComponentFixture<ResumeTemplate01>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeTemplate01]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeTemplate01);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
