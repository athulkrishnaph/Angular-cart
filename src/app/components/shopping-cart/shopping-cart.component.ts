import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';
import { Subscription } from 'rxjs';

interface CartItem {
  product: Product;
  quantity: number;
}
@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  items: CartItem[] = [];
  total = 0;
  private cartSubscription: Subscription | undefined;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartSubscription = this.cartService.cartItems$.subscribe(items => {
      this.items = items;
      this.total = this.cartService.getTotal();
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  remove(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  increaseQuantity(product: Product) {
    this.cartService.changeQuantity(product.id, this.getItemQuantity(product.id) + 1);
  }

  decreaseQuantity(product: Product) {
    const currentQuantity = this.getItemQuantity(product.id);
    if (currentQuantity > 1) {
      this.cartService.changeQuantity(product.id, currentQuantity - 1);
    }
    else {
      this.remove(product.id);
    }
  }

  getItemQuantity(productId: number): number {
    const item = this.items.find(i => i.product.id === productId);
    return item ? item.quantity : 0;
  }
  placeOrder = () => {
  alert('Order placed successfully!');
  this.cartService.clearCart(); 
  this.router.navigate(['/']);
}
}