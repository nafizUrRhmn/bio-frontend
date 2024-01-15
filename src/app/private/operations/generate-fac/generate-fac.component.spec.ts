import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateFacComponent } from './generate-fac.component';

describe('GenerateFacComponent', () => {
  let component: GenerateFacComponent;
  let fixture: ComponentFixture<GenerateFacComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateFacComponent]
    });
    fixture = TestBed.createComponent(GenerateFacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
