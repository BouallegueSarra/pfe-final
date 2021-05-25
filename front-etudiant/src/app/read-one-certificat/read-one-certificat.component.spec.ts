import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOneCertificatComponent } from './read-one-certificat.component';

describe('ReadOneCertificatComponent', () => {
  let component: ReadOneCertificatComponent;
  let fixture: ComponentFixture<ReadOneCertificatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadOneCertificatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadOneCertificatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
