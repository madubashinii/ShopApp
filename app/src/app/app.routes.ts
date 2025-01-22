import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {CategoryComponent} from './components/category/category.component';
import {PageNotFoundComponent} from './components/fixed/page-not-found/page-not-found.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {CartComponent} from './components/cart/cart.component';
import {LoginComponent} from './admin/login/login.component';
import {DashboardComponent} from './admin/dashboard/dashboard.component';
import {CategoryPageComponent} from './components/category-page/category-page.component';
import {ProductDetailComponent} from './components/product-detail/product-detail.component';
import {ProductComponent} from './components/product/product.component';

export const routes: Routes = [
  {path: '', redirectTo: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'categories', component: CategoryComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart', component: CartComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'category/:categoryId', component: CategoryPageComponent},
  {path: 'product/:id', component: ProductDetailComponent},
  {path: 'product', component: ProductComponent},
  {path: '**', component: PageNotFoundComponent},
];
