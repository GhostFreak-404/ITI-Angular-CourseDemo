import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './Components/404NotFound/404NotFound.component';
import { AboutComponent } from './Components/about/about.component';
import { ContactComponent } from './Components/contact/contact.component';
import { HomeComponent } from './Components/Home/Home.component';
import { MainLayoutComponent } from './Components/MainLayout/MainLayout.component';
import { MainLayoutAlternativeComponent } from './Components/MainLayoutAlternative/MainLayoutAlternative.component';
import { NewProductComponent } from './Components/NewProduct/NewProduct.component';
import { ProductDetailsComponent } from './Components/ProductDetails/ProductDetails.component';
import { CartChildComponent } from './Components/ShoppingCart/CartChild/CartChild.component';
import { CartParentComponent } from './Components/ShoppingCart/CartParent/CartParent.component';
import { UserLoginComponent } from './Components/user-login/user-login.component';
import { UserRegistrationComponent } from './Components/UserRegistration/UserRegistration.component';
import { authGuard } from './Guards/auth.guard';
import { notAuthGuard } from './Guards/not-auth.guard';



const routes: Routes = [
  {path: '', component: MainLayoutComponent, children: [
    {path: '', redirectTo: '/Home', pathMatch: 'full'},
    {path: 'Home', component: HomeComponent},
    {path: 'About', component: AboutComponent},
    {path: 'Contacts', component: ContactComponent},
    {path: 'Products', component: CartChildComponent},
    {path: 'Product/:id', component: ProductDetailsComponent},
    {path: 'Orders', component: CartParentComponent, canActivate: [authGuard]},
    {path: 'Login', component: UserLoginComponent, canActivate: [notAuthGuard]},
    {path: 'Register', component: UserRegistrationComponent, canActivate: [notAuthGuard]},
    {path: 'admin/addProduct', component: NewProductComponent, canActivate: [authGuard]},
    {path: 'admin/addProduct/:id', component: NewProductComponent, canActivate: [authGuard]},
  ]},
  {path: '', component: MainLayoutAlternativeComponent, children: [
    {path: 'User', loadChildren: () => import('../User/User.module').then(m => m.UserModule), canActivate: [authGuard]},
  ]},

  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})
  ],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
