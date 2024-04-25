import {Component} from '@angular/core';

import {FormBuilder, Validators} from "@angular/forms";
import {
  englishOnlyValidator,
  numbersOnlyValidator,
  precisionValidator
} from "../../_custom-validator/custom-validators.component";


@Component({
  selector: 'app-reactive-form-example',
  templateUrl: './reactive-form-example.component.html',
  styleUrls: ['./reactive-form-example.component.scss']
})
export class ReactiveFormExampleComponent {

  exampleForm = this.formBuilder.group({
    normal: ['', [Validators.required, Validators.minLength(4),
      Validators.maxLength(20)]],
    englishOnly: ['', [Validators.required, Validators.minLength(4),
      Validators.maxLength(20), englishOnlyValidator()]],
    amount: ['', [Validators.required, Validators.min(1),
      Validators.max(9999999999), numbersOnlyValidator()]],
    percentageWithSixDigitPrecision: ['', [precisionValidator()]],
    positiveInteger: [''],
    negativeInteger: ['']
  });

  get normal() {
    return this.exampleForm.get('normal');
  }

  get normalErrors() {
    return this.checker(this.normal.errors);
  }

  get amount() {
    return this.exampleForm.get('amount');
  }

  get amountErrors() {
    return this.checker(this.amount.errors);
  }

  get englishOnly(){
    return this.exampleForm.get('englishOnly');
  }

  get englishErrors(){
    return this.checker(this.englishOnly.errors);
  }

  get percentageWithSixDigitPrecision(){
    return this.exampleForm.get('percentageWithSixDigitPrecision');
  }

  get percentageWithSixDigitPrecisionErrors(){
    return this.checker(this.percentageWithSixDigitPrecision.errors);
  }

  checker(errors): string {
    console.log(errors);
    if (errors?.['required']) {
      return 'Value is required';
    } else if (errors?.min){
      return `Minimum number is ${errors?.min?.min}`
    }else if (errors?.max){
      return `Maximum number is ${errors?.max?.max}`
    }else if (errors?.minlength) {
      return `Min length is ${errors?.minlength?.requiredLength}`;
    } else if (errors?.maxlength) {
      return `Max length is ${errors?.maxlength?.requiredLength}`;
    } else if (errors?.englishOnly) {
      return 'English Characters only';
    } else if (errors?.numbersOnly) {
      return 'Number format Allowed Only';
    }  else if (errors?.precisionError) {
      return 'At most after point 6 digits allowed';
    } else {
      return '';
    }
  }

  constructor(private formBuilder: FormBuilder) {
  }


  onSubmit() {

  }

  onReset() {

  }

}
