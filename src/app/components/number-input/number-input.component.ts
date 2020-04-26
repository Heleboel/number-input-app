import { Component, forwardRef, ViewChild, Input } from '@angular/core';
import { NgModel, ControlValueAccessor, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

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
  },
  {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => NumberInputComponent),
    multi: true,
  }]
})
export class NumberInputComponent implements ControlValueAccessor, Validator {

  get regex() {
    if (this.decimals < 0) {
      this.decimals = 0;
    }

    if (this.decimals === 0) {
      return '^[0-9]+$';
    }

    const decimalToken = numeral.localeData().delimiters.decimal;

    return '^[0-9]+(' + decimalToken + '[0-9]{0,' + this.decimals + '})?$';
  }

  @Input()
  decimals = 2;

  @ViewChild(NgModel) model: NgModel;

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


  // ControlValueAccessor implementation

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


  // Validations

  validate(control: AbstractControl): ValidationErrors | null {

    if (this.model && this.model.invalid) {
      return { custom: true };
    }

    return null;
  }
}
