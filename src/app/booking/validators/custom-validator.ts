import { AbstractControl, FormGroup } from '@angular/forms';

export class CustomValidator {
  static validateName(control: AbstractControl) {
    const value: string = control.value as string;
    if (value.includes('test')) {
      return {
        invalidName: true,
      };
    }
    return null;
  }

  static validateSpecialChar(char: string) {
    return (control: AbstractControl) => {
      const value: string = control.value as string;
      if (value.includes(char)) {
        return {
          invalidChar: true,
        };
      }
      return null;
    };
  }

  static validateDate(control: FormGroup) {
    const checkinDate = new Date(control.get('checkinDate')?.value);
    const checkoutDate = new Date(control.get('checkoutDate')?.value);
    const diffTime = checkoutDate.getTime() - checkinDate.getTime();
    const diffDays = Math.ceil(diffTime / (100 * 60 * 60 * 24));
    if (diffDays <= 0) {
      return { invalidDate: true };
    }
    return null;
  }
}
