import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultListCollegueComponent } from './consult-list-collegue.component';

describe('ConsultListCollegueComponent', () => {
  let component: ConsultListCollegueComponent;
  let fixture: ComponentFixture<ConsultListCollegueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultListCollegueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultListCollegueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
