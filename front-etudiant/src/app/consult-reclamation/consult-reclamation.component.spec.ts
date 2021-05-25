import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultReclamationComponent } from './consult-reclamation.component';

describe('ConsultReclamationComponent', () => {
  let component: ConsultReclamationComponent;
  let fixture: ComponentFixture<ConsultReclamationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultReclamationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultReclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
