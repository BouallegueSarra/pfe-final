import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulerReclamationComponent } from './postuler-reclamation.component';

describe('PostulerReclamationComponent', () => {
  let component: PostulerReclamationComponent;
  let fixture: ComponentFixture<PostulerReclamationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostulerReclamationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostulerReclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
