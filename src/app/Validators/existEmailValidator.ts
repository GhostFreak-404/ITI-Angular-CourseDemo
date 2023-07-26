import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, delay } from 'rxjs/operators';


export function checkEmail(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const email = control.value;

    return ajax.getJSON(`http://localhost:3000/User?email=${email}`).pipe(
      delay(1000),
      map((res: any) => {
        // console.log(res);
        if (res.length > 0) {
          return {"emailExist": true}
        }
        return null;
        // for (const user of res) {
        //   if (user.email == email) {
        //     console.log(user);
        //     return {"emailExist": {email: true}}
        //   }
        // }
      }),
    )
  }
}
