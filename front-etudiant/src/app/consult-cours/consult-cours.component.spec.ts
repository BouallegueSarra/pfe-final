import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultCoursComponent } from './consult-cours.component';

describe('ConsultCoursComponent', () => {
  let component: ConsultCoursComponent;
  let fixture: ComponentFixture<ConsultCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultCoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
