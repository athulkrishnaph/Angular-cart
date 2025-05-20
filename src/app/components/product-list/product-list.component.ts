import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnDestroy {
  products: Product[] = [
    { id: 1, name: 'Fjallraven - Foldsack No. 1 Backpack', price: 109.95, description: 'Your perfect companion for everyday adventures.', imageUrl: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg' },
    { id: 2, name: 'Mens Casual Premium Slim Fit T-Shirts', price: 22.3, description: 'Slim fit, soft cotton t-shirt.', imageUrl: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg' },
    { id: 3, name: 'Mens Cotton Jacket', price: 55.99, description: 'Lightweight cotton jacket for spring/autumn.', imageUrl: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg' },
    { id: 4, name: 'Mens Casual Slim Fit', price: 15.99, description: 'Slim fit long sleeve shirt.', imageUrl: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg' }
  ];

  private cartSubscription: Subscription | undefined;
  productCounts: { [productId: number]: number } = {};

  constructor(private cartService: CartService) {
    this.cartSubscription = this.cartService.cartItems$.subscribe(items => {
      this.updateProductCounts(items);
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  updateProductCounts(cartItems: { product: Product; quantity: number }[]): void {
    this.productCounts = {};
    cartItems.forEach(item => {
      this.productCounts[item.product.id] = (this.productCounts[item.product.id] || 0) + item.quantity;
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product, 1);
  }

  incrementCartCount(product: Product): void {
    this.cartService.addToCart(product, 1);
  }

  decrementCartCount(product: Product): void {
    this.cartService.decreaseQuantity(product.id);
  }

  getProductCountInCart(productId: number): number {
    return this.productCounts[productId] || 0;
  }
}