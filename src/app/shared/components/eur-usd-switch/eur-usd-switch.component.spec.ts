import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EurUsdSwitchComponent } from './eur-usd-switch.component';

describe('EurUsdSwitchComponent', () => {
  let component: EurUsdSwitchComponent;
  let fixture: ComponentFixture<EurUsdSwitchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EurUsdSwitchComponent]
    });
    fixture = TestBed.createComponent(EurUsdSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
