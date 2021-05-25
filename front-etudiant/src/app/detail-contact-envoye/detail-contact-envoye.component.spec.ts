import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailContactEnvoyeComponent } from './detail-contact-envoye.component';

describe('DetailContactEnvoyeComponent', () => {
  let component: DetailContactEnvoyeComponent;
  let fixture: ComponentFixture<DetailContactEnvoyeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailContactEnvoyeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailContactEnvoyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
