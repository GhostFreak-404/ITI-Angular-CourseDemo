import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { UserProfileComponent } from './UserProfile/UserProfile.component';
import { EditProfileComponent } from './EditProfile/EditProfile.component';
import { NotFoundComponent } from 'src/app/Components/404NotFound/404NotFound.component';
import { authGuard } from 'src/app/Guards/auth.guard';
import { notAuthGuard } from 'src/app/Guards/not-auth.guard';
import { MainLayoutAlternativeComponent } from 'src/app/Components/MainLayoutAlternative/MainLayoutAlternative.component';


const routes: Routes = [
    { path: '', redirectTo: '/User/UserProfile', pathMatch: 'full' },
    { path: 'UserProfile', component: UserProfileComponent },
    { path: 'EditProfile', component: EditProfileComponent },
    { path: '**', component: NotFoundComponent },
]


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    UserProfileComponent,
    EditProfileComponent,
  ]
})
export class UserModule {
  constructor() {
    console.log("User Component Launched");
  }
}
