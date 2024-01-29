import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as accountData from '../../../../../account-data.json';
import { ValidationService } from './Validators';

@Component({
  selector: 'app-move-money',
  templateUrl: './move-money.component.html',
  styleUrls: ['./move-money.component.scss']
  // imports: [NgIf, NgFor]
})
export class MoveMoneyComponent implements OnInit {
  moveMoneyForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.moveMoneyForm = this.fb.group({
      sourceaccnum: ['', [Validators.required, ValidationService.accountNumberValidator,ValidationService.noSpecialCharacterValidator]],
      sourceaccoutlet: ['', [Validators.required]],
      destaccounttitle: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      sourceacctitle: ['', [Validators.required]],
      destaccnum: ['', [Validators.required]],
      destaccoutlet: ['', [Validators.required]],
      transactionremarks: ['', [Validators.required]]
    });

    this.moveMoneyForm
      .get('sourceaccnum')
      .valueChanges.pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((accountNumber) => this.getAccountData(accountNumber))
      )
      .subscribe((data) => {
        if (data) {
          this.moveMoneyForm.patchValue(data);
        } else {
          // this.moveMoneyForm.reset();
        }
      });
  }

  getValidationErrorMsg(controlName: string): string | null {
    const control = this.moveMoneyForm.get(controlName);
    return ValidationService.getValidationErrorMsg(control, controlName);
  }

  getAccountData(accountNumber: string) {
    if (accountData[accountNumber]) {
      return of(accountData[accountNumber]);
    } else {
      return of(null);
    }
  }

  // accountNumberValidator(control) {
  //   const value = control.value;

  //   // Check if the account number is 13 or 16 digits long
  //   if (value && !/^\d{13}$|^\d{16}$/.test(value)) {
  //     return { invalidAccountNumber: true };
  //   }

  //   return null;
  // }

  // noSpecialCharacterValidator(control) {

  //     const value = control.value;

  //     // Check if the value contains any special characters
  //     if (value && /[!=@#$%^&*(),.?":{}|<>-]/.test(value)) {
  //       return { containsSpecialCharacter: true };
  //     }

  //     return null;

  // }

  submitForm() {
    if (this.moveMoneyForm.valid) {
      // console.log(this.moveMoneyForm.value);
      const formData = this.moveMoneyForm.value;
      alert(JSON.stringify(formData));
      // Add logic to proceed with the form data, such as sending it to a server.
    } else {
      this.markFormGroupTouched(this.moveMoneyForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  get sourceaccnum() {
    return this.moveMoneyForm.get('sourceaccnum');
  }

  get sourceaccoutlet() {
    return this.moveMoneyForm.get('sourceaccoutlet');
  }

  get destaccounttitle() {
    return this.moveMoneyForm.get('destaccounttitle');
  }

  get amount() {
    return this.moveMoneyForm.get('amount');
  }

  get sourceacctitle() {
    return this.moveMoneyForm.get('sourceacctitle');
  }

  get destaccnum() {
    return this.moveMoneyForm.get('destaccnum');
  }

  get destaccoutlet() {
    return this.moveMoneyForm.get('destaccoutlet');
  }

  get transactionremarks() {
    return this.moveMoneyForm.get('transactionremarks');
  }
}
