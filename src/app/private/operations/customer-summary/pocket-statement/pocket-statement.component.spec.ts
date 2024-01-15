import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocketStatementComponent } from './pocket-statement.component';

describe('PocketStatementComponent', () => {
  let component: PocketStatementComponent;
  let fixture: ComponentFixture<PocketStatementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PocketStatementComponent]
    });
    fixture = TestBed.createComponent(PocketStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
