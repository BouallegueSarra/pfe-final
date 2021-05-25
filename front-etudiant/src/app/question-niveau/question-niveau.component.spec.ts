import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionNiveauComponent } from './question-niveau.component';

describe('QuestionNiveauComponent', () => {
  let component: QuestionNiveauComponent;
  let fixture: ComponentFixture<QuestionNiveauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionNiveauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionNiveauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
