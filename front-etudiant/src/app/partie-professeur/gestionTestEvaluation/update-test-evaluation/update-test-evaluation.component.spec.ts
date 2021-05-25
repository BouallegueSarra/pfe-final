import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTestEvaluationComponent } from './update-test-evaluation.component';

describe('UpdateTestEvaluationComponent', () => {
  let component: UpdateTestEvaluationComponent;
  let fixture: ComponentFixture<UpdateTestEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTestEvaluationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTestEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
