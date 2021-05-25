import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTestEvaluationComponent } from './add-test-evaluation.component';

describe('AddTestEvaluationComponent', () => {
  let component: AddTestEvaluationComponent;
  let fixture: ComponentFixture<AddTestEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTestEvaluationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTestEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
