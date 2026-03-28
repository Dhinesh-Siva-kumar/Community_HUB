import { Component, OnInit, OnDestroy, inject, signal, computed, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { NotificationService } from '../../../core/services/notification.service';
import { User, DashboardStats, Notification } from '../../../core/models';
import { PeopleConnectionComponent } from '../../../shared/components/svg-illustrations/people-connection.component';

interface QuickLink {
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  route: string;
}

interface RecentPost {
  id: number;
  content: string;
  communityName: string;
  timeAgo: string;
  type: string;
  likes: number;
  comments: number;
}

interface ProfileItem {
  label: string;
  completed: boolean;
  route: string;
}

interface AnimatedStat {
  label: string;
  value: number;
  displayValue: number;
  icon: string;
  iconColor: string;
  bgColor: string;
  accentColor: string;
}

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe, PeopleConnectionComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  notificationService = inject(NotificationService);
  private platformId = inject(PLATFORM_ID);

  loading = signal(true);
  user = signal<User | null>(null);
  stats = signal<DashboardStats | null>(null);
  today = signal(new Date());

  profileCompletion = computed(() => this.user()?.profileCompletion ?? 0);
  firstName = computed(() => this.user()?.userName ?? 'User');

  // Time-based greeting
  greeting = computed(() => {
    const hour = this.today().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  });

  // Profile strength label
  profileStrength = computed(() => {
    const pct = this.profileCompletion();
    if (pct >= 100) return 'Complete';
    if (pct >= 75) return 'Strong';
    if (pct >= 50) return 'Intermediate';
    if (pct >= 25) return 'Getting there';
    return 'Just started';
  });

  // Animated stat counters — 5 stats (palette: #5865f2 primary, #22c55e success, #f97316 warning, #ef4444 danger, #eb459e accent)
  animatedStats = signal<AnimatedStat[]>([
    { label: 'Communities', value: 0, displayValue: 0, icon: 'bi-people-fill', iconColor: '#5865f2', bgColor: '#ede9fe', accentColor: '#5865f2' },
    { label: 'Posts', value: 0, displayValue: 0, icon: 'bi-file-earmark-text-fill', iconColor: '#22c55e', bgColor: '#dcfce7', accentColor: '#22c55e' },
    { label: 'Businesses', value: 0, displayValue: 0, icon: 'bi-shop', iconColor: '#f97316', bgColor: '#fff7ed', accentColor: '#f97316' },
    { label: 'Events', value: 0, displayValue: 0, icon: 'bi-calendar-event-fill', iconColor: '#ef4444', bgColor: '#fef2f2', accentColor: '#ef4444' },
    { label: 'Jobs', value: 0, displayValue: 0, icon: 'bi-briefcase-fill', iconColor: '#eb459e', bgColor: '#fdf2f8', accentColor: '#eb459e' },
  ]);

  private animationFrameId: number | null = null;

  profileItems = computed<ProfileItem[]>(() => {
    const u = this.user();
    if (!u) return [];
    return [
      { label: 'Add phone number', completed: !!u.phone, route: '/user/profile' },
      { label: 'Upload avatar', completed: !!u.avatar, route: '/user/profile' },
      { label: 'Set interests', completed: u.interests?.length > 0, route: '/user/profile' },
      { label: 'Add bio', completed: !!u.bio, route: '/user/profile' },
      { label: 'Set location', completed: !!u.location, route: '/user/profile' },
      { label: 'Add professional category', completed: !!u.professionalCategory, route: '/user/profile' },
    ];
  });

  completedItems = computed(() => this.profileItems().filter((item) => item.completed));
  incompleteItems = computed(() => this.profileItems().filter((item) => !item.completed));

  // Latest 5 notifications for the inline panel
  latestNotifications = computed(() => {
    return this.notificationService.notifications().slice(0, 5);
  });

  quickLinks = signal<QuickLink[]>([
    {
      title: 'Communities',
      description: 'Browse & join',
      icon: 'bi-people-fill',
      color: '#5865f2',
      bgColor: '#ede9fe',
      route: '/user/community',
    },
    {
      title: 'Businesses',
      description: 'Discover local',
      icon: 'bi-shop',
      color: '#22c55e',
      bgColor: '#dcfce7',
      route: '/user/business',
    },
    {
      title: 'Events',
      description: 'Find nearby',
      icon: 'bi-calendar-event-fill',
      color: '#f97316',
      bgColor: '#fff7ed',
      route: '/user/events',
    },
    {
      title: 'Jobs',
      description: 'Opportunities',
      icon: 'bi-briefcase-fill',
      color: '#ef4444',
      bgColor: '#fef2f2',
      route: '/user/jobs',
    },
  ]);

  recentPosts = signal<RecentPost[]>([
    { id: 1, content: 'Looking for recommendations for a good plumber in the area. Any suggestions?', communityName: 'London Central', timeAgo: '30 min ago', type: 'HELP', likes: 5, comments: 12 },
    { id: 2, content: 'Community clean-up event this Saturday at 10am! Everyone welcome to join.', communityName: 'Manchester East', timeAgo: '2 hrs ago', type: 'GENERAL', likes: 18, comments: 7 },
    { id: 3, content: 'New cafe opening on High Street next week. Heard they have amazing pastries!', communityName: 'Birmingham South', timeAgo: '5 hrs ago', type: 'GENERAL', likes: 24, comments: 3 },
    { id: 4, content: 'Street lights on Oak Road have been out for 3 days. Has anyone reported this?', communityName: 'Leeds North', timeAgo: '1 day ago', type: 'HELP', likes: 9, comments: 15 },
  ]);

  ngOnInit(): void {
    this.loadUserData();
    this.loadDashboardStats();
    this.loadNotifications();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== null && isPlatformBrowser(this.platformId)) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  loadUserData(): void {
    const currentUser = this.authService.currentUser();
    if (currentUser) {
      this.user.set(currentUser);
    }

    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.user.set(user);
      },
      error: () => {},
    });
  }

  loadDashboardStats(): void {
    this.loading.set(true);
    this.userService.getDashboardStats().subscribe({
      next: (data) => {
        this.stats.set(data);
        this.loading.set(false);
        this.startCounterAnimation(data);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe({
      next: () => {},
      error: () => {},
    });
  }

  markNotificationRead(id: string): void {
    this.notificationService.markAsRead(id).subscribe({
      next: () => {},
      error: () => {},
    });
  }

  markAllNotificationsRead(): void {
    this.notificationService.markAllAsRead().subscribe({
      next: () => {},
      error: () => {},
    });
  }

  private startCounterAnimation(data: DashboardStats): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const targets = [
      data.joinedCommunities ?? data.totalCommunities ?? 0,
      data.userPosts ?? data.totalPosts ?? 0,
      data.userBusinesses ?? data.totalBusinesses ?? 0,
      data.userEvents ?? data.totalEvents ?? 0,
      data.userJobs ?? data.totalJobs ?? 0,
    ];

    const duration = 1500;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      this.animatedStats.update((stats) =>
        stats.map((stat, i) => ({
          ...stat,
          value: targets[i],
          displayValue: Math.round(eased * targets[i]),
        }))
      );

      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(animate);
      }
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }

  getPostTypeBadge(type: string): { label: string; class: string; icon: string } {
    switch (type) {
      case 'EMERGENCY':
        return { label: 'Emergency', class: 'badge-emergency', icon: 'bi-exclamation-triangle-fill' };
      case 'HELP':
        return { label: 'Help', class: 'badge-help', icon: 'bi-question-circle-fill' };
      default:
        return { label: 'General', class: 'badge-general', icon: 'bi-chat-fill' };
    }
  }

  getNotificationIcon(type: string): string {
    switch (type) {
      case 'POST_APPROVED': return 'bi-check-circle-fill';
      case 'POST_REJECTED': return 'bi-x-circle-fill';
      case 'NEW_COMMENT': return 'bi-chat-dots-fill';
      case 'NEW_LIKE': return 'bi-heart-fill';
      case 'NEW_MEMBER': return 'bi-person-plus-fill';
      case 'COMMUNITY_UPDATE': return 'bi-megaphone-fill';
      case 'EVENT_REMINDER': return 'bi-calendar-check-fill';
      default: return 'bi-bell-fill';
    }
  }

  getNotificationIconColor(type: string): string {
    switch (type) {
      case 'POST_APPROVED': return '#22c55e';
      case 'POST_REJECTED': return '#ef4444';
      case 'NEW_COMMENT': return '#5865f2';
      case 'NEW_LIKE': return '#eb459e';
      case 'NEW_MEMBER': return '#3b82f6';
      case 'COMMUNITY_UPDATE': return '#f97316';
      case 'EVENT_REMINDER': return '#8b5cf6';
      default: return '#9ca3af';
    }
  }

  getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
  }
}
