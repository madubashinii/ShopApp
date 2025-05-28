import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  stats = {
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0
  };

  constructor(private dashboardService: AuthService) {}

  ngOnInit(): void {
    this.dashboardService.getDashboardStats().subscribe(
      data => {
        this.stats = data;
      },
      error => {
        console.error('Error fetching dashboard stats', error);
      }
    );
  }
}
