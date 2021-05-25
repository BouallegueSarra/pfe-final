import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParagComponent } from './add-parag.component';

describe('AddParagComponent', () => {
  let component: AddParagComponent;
  let fixture: ComponentFixture<AddParagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddParagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
