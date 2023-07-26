import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";






export function matchingPasswordValidator(complexPassword: boolean = false): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    let passwordControl = control.get("password");
    let confirmPasswordControl = control.get("confirmPassword");

    if (!confirmPasswordControl || !passwordControl || !passwordControl?.value) {
      return null
    }

    if (complexPassword) {
      let fullNameControl = control.get("fullName");
      if (passwordControl.value == fullNameControl?.value) {
        let nameErr = {"passwordIsSameAsFullname": {"name": fullNameControl?.value, "password": passwordControl.value}};
        return nameErr;
      } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/.test(passwordControl.value) && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/.test(confirmPasswordControl.value)) {
        let patternErr = {"patternErr": {"password": passwordControl.value}};
        return patternErr;
      } else {
        let valError = {"unmatchedPassword": {'pass': passwordControl.value, 'confirm': confirmPasswordControl.value}};
        return (passwordControl.value == confirmPasswordControl.value)? null: valError;
      }
    }
    return null;
  }
}

