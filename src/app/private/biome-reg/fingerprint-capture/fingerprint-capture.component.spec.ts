import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FingerprintCaptureComponent } from './fingerprint-capture.component';

describe('FingerprintCaptureComponent', () => {
  let component: FingerprintCaptureComponent;
  let fixture: ComponentFixture<FingerprintCaptureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FingerprintCaptureComponent]
    });
    fixture = TestBed.createComponent(FingerprintCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
