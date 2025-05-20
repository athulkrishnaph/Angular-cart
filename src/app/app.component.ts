import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    <nav class="navbar navbar-expand navbar-dark bg-primary mb-4">
      <div class="container">
        <a class="navbar-brand" routerLink="">ShopCart</a>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" routerLink="">Products</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="cart">Cart ({{ totalItems$ | async }})</a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent implements OnInit, OnDestroy {
  totalItems$: Observable<number>;
  private cartSubscription: Subscription | undefined;

  constructor(private cartService: CartService) {
    this.totalItems$ = new Observable<number>();
  }

  ngOnInit(): void {
    this.totalItems$ = this.cartService.cartItems$.pipe(
      map(items => items.reduce((sum, item) => sum + item.quantity, 0))
    );

    this.cartSubscription = this.totalItems$.subscribe();
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}