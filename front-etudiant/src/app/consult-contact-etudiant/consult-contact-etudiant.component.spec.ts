import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultContactEtudiantComponent } from './consult-contact-etudiant.component';

describe('ConsultContactEtudiantComponent', () => {
  let component: ConsultContactEtudiantComponent;
  let fixture: ComponentFixture<ConsultContactEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultContactEtudiantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultContactEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
