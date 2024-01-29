import { AbstractControl } from '@angular/forms';

export class ValidationService {
  static getValidationErrorMsg(control: AbstractControl, controlName: string): string | null {
    if (control && control.touched && control.errors) {
      console.log('1');
      console.log(control.errors);
      if (control.hasError('required')) {
        return `${controlName} is required.`;
      } else if (control.hasError('invalidAccountNumber')) {
        return `Invalid ${controlName}. It should be 13 or 16 digits.`;
      } else if (control.hasError('containsSpecialCharacter')) {
        return `${controlName} should not contain special characters.`;
      }
    }

    return null;
  }

  static accountNumberValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;

    // Check if the account number is 13 or 16 digits long
    if (value && !/^\d{13}$|^\d{16}$/.test(value)) {
      return { invalidAccountNumber: true };
    }

    return null;
  }

  static noSpecialCharacterValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;

    // Check if the value contains any special characters
    if (value && /[!=@#$%^&*(),.?":{}|<>-]/.test(value)) {
      return { containsSpecialCharacter: true };
    }

    return null;
  }
}
