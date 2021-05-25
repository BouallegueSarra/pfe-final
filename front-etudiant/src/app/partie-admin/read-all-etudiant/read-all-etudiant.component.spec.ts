import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadAllEtudiantComponent } from './read-all-etudiant.component';

describe('ReadAllEtudiantComponent', () => {
  let component: ReadAllEtudiantComponent;
  let fixture: ComponentFixture<ReadAllEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadAllEtudiantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadAllEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
