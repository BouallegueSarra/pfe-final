import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadAllProfComponent } from './read-all-prof.component';

describe('ReadAllProfComponent', () => {
  let component: ReadAllProfComponent;
  let fixture: ComponentFixture<ReadAllProfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadAllProfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadAllProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
