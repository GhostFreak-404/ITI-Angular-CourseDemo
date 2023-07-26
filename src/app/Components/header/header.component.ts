import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/Services/auth-user.service';
import { Store } from 'src/app/ViewModels/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  storeInfo: Store;
  userName: any = {};
  isUserLogged = this.AuthService.loggedStatus;
  constructor(private AuthService: AuthUserService) {
    this.storeInfo = new Store(
      'Faisal Store',
      ['Giza', 'New Capital', '6 October'],
      'https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg'
    );
  }


  ngOnInit(): void {
    this.AuthService.getloggedSubject().subscribe((status) => {
      this.isUserLogged = status;
    });
  }

  getUsername() {
    return this.AuthService.getUserName();
  }


  ngOnDestroy(): void {
    this.AuthService.getloggedSubject().subscribe((status) => {
      this.isUserLogged = status;
    }).unsubscribe();
  }


  logout() {
    this.AuthService.logout();
  }
}
