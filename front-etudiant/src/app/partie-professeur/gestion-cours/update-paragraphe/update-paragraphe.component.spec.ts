import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateParagrapheComponent } from './update-paragraphe.component';

describe('UpdateParagrapheComponent', () => {
  let component: UpdateParagrapheComponent;
  let fixture: ComponentFixture<UpdateParagrapheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateParagrapheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateParagrapheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
