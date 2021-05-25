import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultDetailCoursEtudiantComponent } from './consult-detail-cours-etudiant.component';

describe('ConsultDetailCoursEtudiantComponent', () => {
  let component: ConsultDetailCoursEtudiantComponent;
  let fixture: ComponentFixture<ConsultDetailCoursEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultDetailCoursEtudiantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultDetailCoursEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
