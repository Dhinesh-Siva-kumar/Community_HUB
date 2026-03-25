import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { DashboardStats } from '../../../core/models';

interface StatCard {
  label: string;
  value: number;
  icon: string;
  color: string;
  bgColor: string;
  route: string;
}

interface QuickAction {
  title: string;
  description: string;
  icon: string;
  color: string;
  route: string;
}

interface ActivityItem {
  id: number;
  icon: string;
  iconColor: string;
  message: string;
  time: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  private userService = inject(UserService);

  loading = signal(true);
  stats = signal<DashboardStats | null>(null);

  statCards = signal<StatCard[]>([]);

  quickActions = signal<QuickAction[]>([
    {
      title: 'Create Community',
      description: 'Set up a new community for users to join',
      icon: 'bi-plus-circle-fill',
      color: '#4f46e5',
      route: '/admin/community',
    },
    {
      title: 'View Pending Posts',
      description: 'Review and approve pending community posts',
      icon: 'bi-clock-history',
      color: '#d97706',
      route: '/admin/post-approval',
    },
    {
      title: 'Manage Users',
      description: 'View, block, or trust user accounts',
      icon: 'bi-people-fill',
      color: '#059669',
      route: '/admin/user-management',
    },
    {
      title: 'Manage Businesses',
      description: 'Review and manage listed businesses',
      icon: 'bi-shop',
      color: '#dc2626',
      route: '/admin/business',
    },
  ]);

  recentActivity = signal<ActivityItem[]>([
    { id: 1, icon: 'bi-check-circle-fill', iconColor: '#059669', message: 'Post approved in "London Central" community', time: '2 minutes ago' },
    { id: 2, icon: 'bi-person-plus-fill', iconColor: '#4f46e5', message: 'New user registered: John Smith', time: '15 minutes ago' },
    { id: 3, icon: 'bi-flag-fill', iconColor: '#dc2626', message: 'Emergency post flagged in "Manchester East"', time: '1 hour ago' },
    { id: 4, icon: 'bi-shop', iconColor: '#d97706', message: 'New business listing: "The Corner Bakery"', time: '2 hours ago' },
    { id: 5, icon: 'bi-people-fill', iconColor: '#0891b2', message: 'New community created: "Birmingham South"', time: '3 hours ago' },
    { id: 6, icon: 'bi-calendar-event', iconColor: '#7c3aed', message: 'New event posted: "Community Clean-up Day"', time: '5 hours ago' },
  ]);

  chartPlaceholders = signal([
    { title: 'User Growth', icon: 'bi-graph-up', description: 'Monthly user registration trends' },
    { title: 'Post Activity', icon: 'bi-bar-chart-fill', description: 'Daily post creation and engagement' },
  ]);

  ngOnInit(): void {
    this.loadDashboardStats();
  }

  loadDashboardStats(): void {
    this.loading.set(true);
    this.userService.getDashboardStats().subscribe({
      next: (data) => {
        this.stats.set(data);
        this.statCards.set([
          {
            label: 'Total Users',
            value: data.totalUsers ?? 0,
            icon: 'bi-people-fill',
            color: '#4f46e5',
            bgColor: '#eef2ff',
            route: '/admin/user-management',
          },
          {
            label: 'Total Communities',
            value: data.totalCommunities ?? 0,
            icon: 'bi-globe2',
            color: '#059669',
            bgColor: '#ecfdf5',
            route: '/admin/community',
          },
          {
            label: 'Pending Approvals',
            value: data.pendingApprovals ?? 0,
            icon: 'bi-clock-history',
            color: '#d97706',
            bgColor: '#fffbeb',
            route: '/admin/post-approval',
          },
          {
            label: 'Total Posts',
            value: data.totalPosts ?? 0,
            icon: 'bi-file-earmark-text-fill',
            color: '#dc2626',
            bgColor: '#fef2f2',
            route: '/admin/post-approval',
          },
        ]);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.statCards.set([
          { label: 'Total Users', value: 0, icon: 'bi-people-fill', color: '#4f46e5', bgColor: '#eef2ff', route: '/admin/user-management' },
          { label: 'Total Communities', value: 0, icon: 'bi-globe2', color: '#059669', bgColor: '#ecfdf5', route: '/admin/community' },
          { label: 'Pending Approvals', value: 0, icon: 'bi-clock-history', color: '#d97706', bgColor: '#fffbeb', route: '/admin/post-approval' },
          { label: 'Total Posts', value: 0, icon: 'bi-file-earmark-text-fill', color: '#dc2626', bgColor: '#fef2f2', route: '/admin/post-approval' },
        ]);
      },
    });
  }
}
