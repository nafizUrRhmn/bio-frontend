import { TestBed } from '@angular/core/testing';

import { FingerprintCaptureService } from './fingerprint-capture.service';

describe('FingerprintCaptureService', () => {
  let service: FingerprintCaptureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FingerprintCaptureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
