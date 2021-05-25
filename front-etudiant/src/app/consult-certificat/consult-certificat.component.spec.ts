import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultCertificatComponent } from './consult-certificat.component';

describe('ConsultCertificatComponent', () => {
  let component: ConsultCertificatComponent;
  let fixture: ComponentFixture<ConsultCertificatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultCertificatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultCertificatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
