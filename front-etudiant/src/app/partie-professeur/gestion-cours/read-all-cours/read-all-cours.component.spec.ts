import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadAllCoursComponent } from './read-all-cours.component';

describe('ReadAllCoursComponent', () => {
  let component: ReadAllCoursComponent;
  let fixture: ComponentFixture<ReadAllCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadAllCoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadAllCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
