import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatStepper} from "@angular/material/stepper";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  @ViewChild('stepper',{read:MatStepper}) stepper:MatStepper;

  menuCreationForm: FormGroup;
  // @ViewChild('stepper') stepper: MatHoriz;

  languages = ['BAN', 'ENG'];

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;


  constructor(private _formBuilder: FormBuilder) {
    // this.menuCreationForm = this.fb.group({});
  }

  ngOnInit(): void {
    // this.menuCreationForm = this.fb.group({

    // });

  }

  onNext(){
    this.stepper.next()
  }

  onCancel(){
    this.stepper.reset()
  }
  onSave() {

  }

}
