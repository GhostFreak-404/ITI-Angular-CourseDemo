import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ProductsComponent } from './Components/products/products.component';
import { IndexComponent } from './Components/Index/Index.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ButtonOverviewExample } from './Components/btns/btns.component';
import { MatSelectModule } from '@angular/material/select';
import { ExchangeRatePipe } from 'src/app/Pipes/ExchangeRate.pipe';
import { DateOfBirthFromIdPipe } from './Pipes/DateOfBirthFromId.pipe';
import { CreditCardFormatPipe } from './Pipes/CreditCardFormat.pipe';
import { LightboxDirective } from './Directives/lightbox.directive';
import { ShadowDirective } from './Directives/Shadow.directive';
import { CartParentComponent } from './Components/ShoppingCart/CartParent/CartParent.component';
import { CartChildComponent } from './Components/ShoppingCart/CartChild/CartChild.component';
import { MainLayoutComponent } from './Components/MainLayout/MainLayout.component';
import { UserLoginComponent } from './Components/user-login/user-login.component';
import { HttpClientModule } from '@angular/common/http';
import { NewProductComponent } from './Components/NewProduct/NewProduct.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserRegistrationComponent } from './Components/UserRegistration/UserRegistration.component';
import { MainLayoutAlternativeComponent } from './Components/MainLayoutAlternative/MainLayoutAlternative.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductsComponent,
    IndexComponent,
    CartParentComponent,
    CartChildComponent,
    LightboxDirective,
    ExchangeRatePipe,
    ShadowDirective,
    DateOfBirthFromIdPipe,
    CreditCardFormatPipe,
    MainLayoutComponent,
    NewProductComponent,
    UserLoginComponent,
    UserRegistrationComponent,
    MainLayoutAlternativeComponent,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    ButtonOverviewExample,
    MatSelectModule,
    MatSnackBarModule,
  ],
})
export class AppModule {}
