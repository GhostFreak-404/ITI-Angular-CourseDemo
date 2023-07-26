import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/Services/auth-user.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { checkEmail } from 'src/app/Validators/existEmailValidator';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { matchingPasswordValidator } from 'src/app/Validators/matchingPasswordValidator';
import { environment } from 'src/environments/environment';
import { catchError, retry, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-UserRegistration',
  templateUrl: './UserRegistration.component.html',
  styleUrls: ['./UserRegistration.component.css']
})


export class UserRegistrationComponent implements OnInit, OnDestroy {
  regForm: FormGroup;
  constructor(private userServ: AuthUserService, private fb: FormBuilder, private router: Router) {
    this.regForm = new FormGroup({
      "fullName": new FormControl('', [Validators.required, Validators.minLength(5)]),
      'email': new FormControl('', {validators: [Validators.required, Validators.email], asyncValidators: [checkEmail()], updateOn: "blur"}),
      "phoneNumber": new FormArray([new FormControl('', [Validators.required, Validators.pattern('012[0-9]{8}')])]),
      // we use FormGroup Because FormArray only makes FormControl of the same type
      "address": new FormGroup({
        'city': new FormControl('', [Validators.required]),
        'postalCode': new FormControl('', [Validators.required]),
        'street': new FormControl('', [Validators.required]),
      }),
      'delivery': new FormControl(''),
      'deliveryDay': new FormControl(''),
      "password": new FormControl('', [Validators.required, Validators.minLength(6)]),
      "confirmPassword" : new FormControl('', [Validators.required])
    }, {validators: matchingPasswordValidator(true)})
  }


  ngOnInit() {
  }

  get fullName() {
    return this.regForm.get('fullName');
  }
  get email() {
    return this.regForm.get('email');
  }
  get phoneNumber() {
    return this.regForm.get('phoneNumber') as FormArray;
  }
  get city() {
    return this.regForm.get('address.city');
  }
  get postal() {
    return this.regForm.get('address.postalCode');
  }
  get street() {
    return this.regForm.get('address.street');
  }
  get password() {
    return this.regForm.get('password');
  }
  get confirmPassword() {
    return this.regForm.get('confirmPassword');
  }
  get delivery() {
    return this.regForm.get('delivery');
  }
  get deliveryDay() {
    return this.regForm.get('deliveryDay');
  }


  addMobileNumber() {
    let val = new FormControl('', [Validators.required, Validators.pattern('012[0-9]{8}')]);
    this.phoneNumber.push(val);
  }

  removeMobileNumber(index: number) {
    this.phoneNumber.removeAt(index);
  }

  changeDelivery() {
    if (this.delivery?.value == 'specific') {
      this.deliveryDay?.addValidators([Validators.required]);
    } else {
      this.deliveryDay?.clearValidators();
    }
    this.deliveryDay?.updateValueAndValidity();
  }


  confirm(){
    // console.log(this.regForm.value);
    if (this.regForm.valid) {
      this.userServ.registerUser(this.regForm.value).pipe(
        retry(3),
        // catchError((err: HttpErrorResponse) => throwError(err))
      ).subscribe((formValue) => {
        console.log(formValue);
        this.userServ.login(formValue.email, formValue.password)
        this.router.navigate(["/Home"]);
      })
    }
  }


  ngOnDestroy(): void {
    this.userServ.registerUser(this.regForm.value).pipe(
      retry(3),
      // catchError((err: HttpErrorResponse) => throwError(err))
    ).subscribe((formValue) => {
      console.log(formValue);
      this.userServ.login(formValue.email, formValue.password)
      this.router.navigate(["/Home"]);
    }).unsubscribe()
  }

}
