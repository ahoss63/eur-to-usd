import { Component, Input } from '@angular/core';
import { SwitchType } from '../../models/switch.type.enum';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'eur-usd-switch',
  templateUrl: './eur-usd-switch.component.html',
  styleUrls: ['./eur-usd-switch.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: EurUsdSwitchComponent,
      multi: true,
    },
  ],
})
export class EurUsdSwitchComponent implements ControlValueAccessor {
  switchValue! : SwitchType;
  switches = SwitchType;
  onChange = (value: SwitchType) => {};
  onTouched = () => {};

  switchToDollar() {
    this.switchValue = this.switches.USD;
    this.onChange(this.switchValue);
  }
  switchToEuro() {
    this.switchValue = this.switches.EUR;
    this.onChange(this.switchValue);
  }

  writeValue(value: SwitchType): void {
    this.switchValue = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
}
