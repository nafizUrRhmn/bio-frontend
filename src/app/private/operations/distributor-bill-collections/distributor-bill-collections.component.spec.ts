import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorBillCollectionsComponent } from './distributor-bill-collections.component';

describe('DistributorBillCollectionsComponent', () => {
  let component: DistributorBillCollectionsComponent;
  let fixture: ComponentFixture<DistributorBillCollectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistributorBillCollectionsComponent]
    });
    fixture = TestBed.createComponent(DistributorBillCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
