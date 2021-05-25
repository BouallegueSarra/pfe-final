import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultContactProfComponent } from './consult-contact-prof.component';

describe('ConsultContactProfComponent', () => {
  let component: ConsultContactProfComponent;
  let fixture: ComponentFixture<ConsultContactProfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultContactProfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultContactProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
