import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { NumberInputComponent } from './number-input.component';

import * as numeral from 'numeral';
import 'numeral/locales/nl-nl';


@Component({
  selector: 'app-stub-number-input',
  template: `
    <app-number-input [(ngModel)]="externalValue">
    </app-number-input>
  `
})
class StubNumberInputComponent {
  @ViewChild(NumberInputComponent) numberInputComponent;

  externalValue = 12.65;
}


describe('NumberInputComponent', () => {
  let component: StubNumberInputComponent;
  let fixture: ComponentFixture<StubNumberInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        StubNumberInputComponent,
        NumberInputComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    numeral.locale('nl-nl');

    fixture = TestBed.createComponent(StubNumberInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the external value in the input box when defined.', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component).toBeDefined();
      const numberInput = component.numberInputComponent;
      expect(numberInput).toBeDefined();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const inputElement = fixture.debugElement.nativeElement;

        const input = inputElement.querySelector('input');
        expect(input).toBeDefined();

        const value = input.value;
        expect(value).toEqual('12,65');
      });
    });
  });

  it('should emit the value put in the input box.', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const inputElement = fixture.debugElement.nativeElement;

      const input = inputElement.querySelector('input');
      expect(input).toBeDefined();

      const newValue = '31,89';
      input.value = newValue;

      const oninputevent = new Event('input');
      input.dispatchEvent(oninputevent);

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const value = component.externalValue;
        expect(value).toEqual(31.89);
      });
    });
  });
});
