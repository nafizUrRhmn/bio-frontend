import {Component, OnInit, ViewChild} from '@angular/core';
import {MatStepper} from "@angular/material/stepper";

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit {
  @ViewChild('onboarding') private stepper: MatStepper;
  isLinear = false;

  constructor() {
  }

  ngOnInit() {
  }

  onNext($event) {
    console.log($event);
    this.stepper.next();
  }

  onPrevious($event) {
    console.log($event);
    this.stepper.previous();
  }
}
