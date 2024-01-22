import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailComponent } from './retail.component';

describe('RetailComponent', () => {
  let component: RetailComponent;
  let fixture: ComponentFixture<RetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RetailComponent]
    });
    fixture = TestBed.createComponent(RetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
