import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancePremiumCollectionComponent } from './insurance-premium-collection.component';

describe('InsurancePremiumCollectionComponent', () => {
  let component: InsurancePremiumCollectionComponent;
  let fixture: ComponentFixture<InsurancePremiumCollectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsurancePremiumCollectionComponent]
    });
    fixture = TestBed.createComponent(InsurancePremiumCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
