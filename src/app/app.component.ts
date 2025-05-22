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
  templateUrl: `app.component.html`
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