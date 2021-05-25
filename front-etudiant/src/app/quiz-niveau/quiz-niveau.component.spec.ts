import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizNiveauComponent } from './quiz-niveau.component';

describe('QuizNiveauComponent', () => {
  let component: QuizNiveauComponent;
  let fixture: ComponentFixture<QuizNiveauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizNiveauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizNiveauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
