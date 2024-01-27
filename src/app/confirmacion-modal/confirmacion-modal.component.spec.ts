import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionModalComponent } from './confirmacion-modal.component';

describe('ConfirmacionModalComponent', () => {
  let component: ConfirmacionModalComponent;
  let fixture: ComponentFixture<ConfirmacionModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmacionModalComponent]
    });
    fixture = TestBed.createComponent(ConfirmacionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
