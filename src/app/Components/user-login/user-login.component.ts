import { Location } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthUserService } from 'src/app/Services/auth-user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/ViewModels/User';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit, OnDestroy {
  // isRouteGuardNavigation: boolean = false;

  @ViewChild('mail') mail!: ElementRef;
  @ViewChild('pass') pass!: ElementRef;
  subs!: Subscription[];

  constructor(
    private AuthService: AuthUserService,
    private router: Router,
    private location: Location,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationStart) {
    //     this.isRouteGuardNavigation = !!event.navigationTrigger;
    //   }
    // });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2000 });
  }

  login() {
    this.AuthService.login(
      this.mail.nativeElement.value,
      this.pass.nativeElement.value
    );
    let subscription = this.AuthService.getloggedSubject().subscribe((data) => {
      if (data == true) {
        this.location.back();
        this.openSnackBar(`Welcome ${this.AuthService.getUserName()}` , "Got It")
      } else {
        this.openSnackBar("Email Is Not Registered" , "Got It")
      }
    });
    this.subs.push(subscription);

    // if (this.isRouteGuardNavigation) {
    //   this.router.navigateByUrl("../");
    // } else {
    //   this.router.navigateByUrl("/Home");
    // }
  }

  ngOnDestroy(): void {
    if (this.subs) {
      setTimeout(() => {
        this.subs.forEach((sub) => sub.unsubscribe());
      }, 100);
    }
  }
}
