import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';

interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  addToCart(product: Product, quantity: number) {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
      this.cartItems.next([...currentItems]);
    } else {
      this.cartItems.next([...currentItems, { product, quantity }]);
    }
  }

  decreaseQuantity(productId: number) {
    const currentItems = this.cartItems.value;
    const item = currentItems.find(item => item.product.id === productId);

    if (item) {
      item.quantity--;
      if (item.quantity === 0) {
        this.removeFromCart(productId); // Remove if quantity becomes 0
      } else {
        this.cartItems.next([...currentItems]);
      }
    }
  }

  removeFromCart(productId: number) {
    const currentItems = this.cartItems.value;
    const updatedItems = currentItems.filter(item => item.product.id !== productId);
    this.cartItems.next(updatedItems);
  }

  changeQuantity(productId: number, quantity: number) {
    const currentItems = this.cartItems.value;
    const item = currentItems.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) { // Ensure quantity doesn't go below 0, remove if it does
        this.removeFromCart(productId);
      } else {
        this.cartItems.next([...currentItems]);
      }
    }
  }

  getTotal(): number {
    return this.cartItems.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  getTotalItems(): number {
    return this.cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
  }

  clearCart() {
    this.cartItems.next([]);
  }
}