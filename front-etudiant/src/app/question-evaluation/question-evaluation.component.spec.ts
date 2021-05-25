import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionEvaluationComponent } from './question-evaluation.component';

describe('QuestionEvaluationComponent', () => {
  let component: QuestionEvaluationComponent;
  let fixture: ComponentFixture<QuestionEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionEvaluationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
