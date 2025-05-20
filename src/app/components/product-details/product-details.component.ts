import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product: Product | null = null;
  quantity: number = 1;
  private routeSub: Subscription | undefined;
  private productSub: Subscription | undefined;
  notificationMessage: string = '';
  isNotificationVisible: boolean = false;

  products: Product[] = [
    { id: 1, name: 'Fjallraven - Foldsack No. 1 Backpack', price: 109.95, description: 'Your perfect companion for everyday adventures.', imageUrl: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg' },
    { id: 2, name: 'Mens Casual Premium Slim Fit T-Shirts', price: 22.3, description: 'Slim fit, soft cotton t-shirt.', imageUrl: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg' },
    { id: 3, name: 'Mens Cotton Jacket', price: 55.99, description: 'Lightweight cotton jacket for spring/autumn.', imageUrl: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg' },
    { id: 4, name: 'Mens Casual Slim Fit', price: 15.99, description: 'Slim fit long sleeve shirt.', imageUrl: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg' }
  ];

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.getProductDetails(id);
      } else {
        console.error('Product ID is missing.');
        this.router.navigate(['/products']);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.productSub) {
      this.productSub.unsubscribe();
    }
  }

  getProductDetails(id: number): void {
    // Replace this with your actual product retrieval logic (e.g., from a service)
    // Example using hardcoded data:
    this.product = this.products.find(p => p.id === id) || null;
    if (!this.product) {
      this.router.navigate(['/products']);
    }

    /*
    // Example using a ProductService (if you have one):
    this.productSub = this.productService.getProduct(id).subscribe({
      next: (product) => {
        this.product = product;
      },
      error: (error) => {
        console.error('Error fetching product:', error);
        this.router.navigate(['/products']);
      }
    });
    */
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity);
      this.notificationMessage = `Added ${this.quantity} ${this.product.name}(s) to cart!`;
      this.isNotificationVisible = true;
      this.quantity = 1;
    }
  }

  closeNotification() {
    this.isNotificationVisible = false;
  }
}