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
    { id: 1, name: 'Fjallraven - Foldsack No. 1 Backpack', price: 109.95, description: "This backpack is crafted from Fjällräven’s signature G-1000 HeavyDuty Eco fabric, a durable and weather-resistant blend of recycled polyester and organic cotton. Featuring a deep navy blue color complemented by a natural leather logo patch, its design combines vintage charm with practicality. The top flap secures with leather strap details, adding a rugged aesthetic, while a drawstring closure underneath provides extra security. Inside, a spacious main compartment includes an internal laptop sleeve and smaller pockets to help organize your essentials, making it perfect for everyday use, school, work, or short trips. The iconic arctic fox logo on the front highlights the backpack’s authenticity and the brand’s quality.", imageUrl: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg' },
    { id: 2, name: 'Mens Casual Premium Slim Fit T-Shirts', price: 22.3, description: "This men's casual raglan Henley shirt offers a sporty yet stylish look that seamlessly blends comfort and fashion. Featuring a contrasting black sleeve and collar design against a light grey body, the shirt stands out with its modern two-tone aesthetic. The three-button Henley placket adds a touch of versatility, allowing the neckline to be adjusted for comfort or style. Made from a soft and breathable cotton-blend fabric, it provides a snug yet flexible fit that’s perfect for everyday wear. Ideal for pairing with jeans or joggers, this shirt is a go-to choice for casual outings, weekend hangouts, or layering under jackets.", imageUrl: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg' },
    { id: 3, name: 'Mens Cotton Jacket', price: 55.99, description: "This khaki casual jacket combines functionality with a refined urban aesthetic, making it a stylish staple for transitional weather. Crafted from durable cotton fabric with a soft lining, it offers warmth without sacrificing comfort. The jacket features a stand collar, buttoned shoulder epaulets, and multiple pockets—including a zippered chest pocket and two flap pockets—providing both visual appeal and practical storage. Its front zip and snap-button closure ensures secure wear, while the clean lines and neutral tone make it easy to pair with any outfit. Perfect for layering over t-shirts or sweaters, this jacket is ideal for casual outings or a smart-casual look.", imageUrl: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg' },
    { id: 4, name: 'Mens Casual Slim Fit', price: 15.99, description: "This classic navy blue long-sleeve t-shirt offers a sleek and versatile addition to any modern wardrobe. Made from a soft and breathable cotton blend, it provides all-day comfort while maintaining a slim and flattering fit. The V-neckline adds a stylish touch, making it easy to layer under jackets or wear on its own for a clean, casual look. Ideal for everyday wear, whether you're heading out for errands, meeting friends, or relaxing at home, this top combines comfort and style effortlessly.", imageUrl: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg' }
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

    this.product = this.products.find(p => p.id === id) || null;
    if (!this.product) {
      this.router.navigate(['/products']);
    }

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