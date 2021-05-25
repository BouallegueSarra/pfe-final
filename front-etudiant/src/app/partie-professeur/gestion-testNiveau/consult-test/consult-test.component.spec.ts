import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultTestComponent } from './consult-test.component';

describe('ConsultTestComponent', () => {
  let component: ConsultTestComponent;
  let fixture: ComponentFixture<ConsultTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
