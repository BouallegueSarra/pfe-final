import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvoyermessageComponent } from './envoyermessage.component';

describe('EnvoyermessageComponent', () => {
  let component: EnvoyermessageComponent;
  let fixture: ComponentFixture<EnvoyermessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvoyermessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvoyermessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
