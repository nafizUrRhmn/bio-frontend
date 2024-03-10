import { Component, ViewEncapsulation } from '@angular/core';
import {LoaderService} from "../../../../_services/loader.service";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class SpinnerComponent {
  constructor(public loader: LoaderService) { }
}
