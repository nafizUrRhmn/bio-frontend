import {AbstractControl, ValidatorFn} from "@angular/forms";

export function englishOnlyValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value;
    if (!/^[a-zA-Z\s]*$/.test(value)) {
      return {'englishOnly': {value: value}};
    }
    return null;
  };
}

export function numbersOnlyValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value;
    if (!/^[0-9]*$/.test(value)) {
      return {'numbersOnly': {value: value}};
    }
    return null;
  };
}

export function precisionValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value;
    if (!/^\d+(\.\d{1,6})?$/.test(value)) {
      return {'precisionError': {value: value}};
    }
    return null;
  };
}
