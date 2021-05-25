import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultTestEvaluationComponent } from './consult-test-evaluation.component';

describe('ConsultTestEvaluationComponent', () => {
  let component: ConsultTestEvaluationComponent;
  let fixture: ComponentFixture<ConsultTestEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultTestEvaluationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultTestEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
