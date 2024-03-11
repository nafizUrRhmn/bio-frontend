import {Component, ViewEncapsulation} from '@angular/core';
import {LoaderService} from "../../../../_services/loader.service";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  // encapsulation: ViewEncapsulation.ShadowDom,
})
export class SpinnerComponent {
  constructor(public loader: LoaderService) {
    this.loader.isLoading$.subscribe(u => console.log(u));
  }
}
