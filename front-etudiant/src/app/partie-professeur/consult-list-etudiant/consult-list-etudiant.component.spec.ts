import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultListEtudiantComponent } from './consult-list-etudiant.component';

describe('ConsultListEtudiantComponent', () => {
  let component: ConsultListEtudiantComponent;
  let fixture: ComponentFixture<ConsultListEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultListEtudiantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultListEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
