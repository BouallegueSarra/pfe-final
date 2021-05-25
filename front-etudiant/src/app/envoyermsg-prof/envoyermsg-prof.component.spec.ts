import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvoyermsgProfComponent } from './envoyermsg-prof.component';

describe('EnvoyermsgProfComponent', () => {
  let component: EnvoyermsgProfComponent;
  let fixture: ComponentFixture<EnvoyermsgProfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvoyermsgProfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvoyermsgProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
