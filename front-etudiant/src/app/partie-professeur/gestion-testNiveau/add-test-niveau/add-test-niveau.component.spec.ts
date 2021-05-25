import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTestNiveauComponent } from './add-test-niveau.component';

describe('AddTestNiveauComponent', () => {
  let component: AddTestNiveauComponent;
  let fixture: ComponentFixture<AddTestNiveauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTestNiveauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTestNiveauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
