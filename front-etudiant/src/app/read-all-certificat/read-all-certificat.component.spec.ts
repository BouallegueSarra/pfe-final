import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadAllCertificatComponent } from './read-all-certificat.component';

describe('ReadAllCertificatComponent', () => {
  let component: ReadAllCertificatComponent;
  let fixture: ComponentFixture<ReadAllCertificatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadAllCertificatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadAllCertificatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
