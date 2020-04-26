import { Component } from '@angular/core';

import * as numeral from 'numeral';
import 'numeral/locales/nl-nl';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'number-input-app';

  externalValue: number = 12.65;

  constructor() {
    numeral.locale('nl-nl');
  }
}
