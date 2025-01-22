import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatBadgeModule} from '@angular/material/badge';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {CartService} from '../../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatToolbarModule,
    MatBadgeModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  totalQty: number = 0;

  constructor(private cartService: CartService, private route: Router) {
  }

  ngOnInit(): void {
    this.addCartQty();
  }


  addCartQty() {
    this.cartService.totalQuantity.subscribe(
      data => this.totalQty = data
    );
  }
}
