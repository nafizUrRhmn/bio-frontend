import {AbstractControl, ValidatorFn} from "@angular/forms";

export function englishOnlyValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value;
    if(!control.touched && (value == null || value.length <= 0)){
      control.markAsPristine({onlySelf: true})
      return null;
    }
    if (!/^[a-zA-Z0-9\s]*$/.test(value)) {
      return {'englishOnly': {value: value}};
    }
    return null;
  };
}

export function numbersOnlyValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value;
    if(value == null || (value + '').length <= 0) {
      return null;
    }
    if (!/^[0-9]*$/.test(value)) {
      return {'numbersOnly': {value: value}};
    }
    return null;
  };
}

export function precisionValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value;
    if(value == null || (value + '').length <= 0) {
      return null;
    }
    if (!/^\d+(\.\d{1,6})?$/.test(value)) {
      return {'precisionError': {value: value}};
    }
    return null;
  };
}

export function negativeIntegerValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const value: number = control.value;
    if(value == null || (value + '').length <= 0) {
      return null;
    }
    if (isNaN(value) || value >= 0 || !Number.isInteger(value)) {
      return {'negativeInteger': {value: value}};
    }
    return null;
  };
}
