import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent }, // Changed path to 'product-details/:id'
  { path: 'cart', component: ShoppingCartComponent },
  { path: '**', redirectTo: '' },
];