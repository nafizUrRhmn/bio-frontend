import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MigrateOfferComponent } from './migrate-offer.component';

describe('MigrateOfferComponent', () => {
  let component: MigrateOfferComponent;
  let fixture: ComponentFixture<MigrateOfferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MigrateOfferComponent]
    });
    fixture = TestBed.createComponent(MigrateOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
