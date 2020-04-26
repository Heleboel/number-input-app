import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import * as numeral from 'numeral';
import 'numeral/locales/nl-nl';


@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NumberInputComponent),
    multi: true
  }]
})
export class NumberInputComponent implements ControlValueAccessor {

  private _innerValue: string = null;

  get innerValue(): string {
    return this._innerValue;
  }

  set innerValue(value: string) {
    if (value !== this._innerValue) {
      this._innerValue = value;
      const numeralValue = numeral(value);
      this.onChange(numeralValue.value());
    }
  }

  private onChange: (value: number) => void = () => { };
  private onTouched: () => void = () => { };

  writeValue(value: number): void {
    const numeralValue = numeral(value);
    const formattedValue = numeralValue.format('0.0[00]');
    if (formattedValue !== this.innerValue) {
      this.innerValue = formattedValue;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }
}
