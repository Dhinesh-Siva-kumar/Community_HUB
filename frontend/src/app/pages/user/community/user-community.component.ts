import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CommunityService } from '../../../core/services/community.service';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { Community, PaginatedResponse } from '../../../core/models';
import { AnimateOnScrollDirective } from '../../../shared/directives/animate-on-scroll.directive';
import { CommunityActivityComponent } from '../../../shared/components/svg-illustrations/community-activity.component';
import { PeopleConnectionComponent } from '../../../shared/components/svg-illustrations/people-connection.component';

@Component({
  selector: 'app-user-community',
  standalone: true,
  imports: [CommonModule, AnimateOnScrollDirective, CommunityActivityComponent, PeopleConnectionComponent],
  templateUrl: './user-community.component.html',
  styleUrls: ['./user-community.component.scss'],
})
export class UserCommunityComponent implements OnInit {
  private communityService = inject(CommunityService);
  private authService = inject(AuthService);
  private toast = inject(ToastService);
  private router = inject(Router);

  // Signals
  communities = signal<Community[]>([]);
  loading = signal(true);
  searchTerm = signal('');
  currentPage = signal(1);
  totalPages = signal(1);
  totalItems = signal(0);
  pageSize = signal(9);
  joiningId = signal<number | null>(null);
  leavingId = signal<number | null>(null);

  // Track which communities the user has joined
  joinedCommunityIds = signal<Set<number>>(new Set());

  // Computed
  filteredCommunities = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.communities();
    return this.communities().filter(
      (c) =>
        c.community_name.toLowerCase().includes(term) ||
        (c.description?.toLowerCase().includes(term)) );
  });

  currentUserId = computed(() => this.authService.currentUser()?.id ?? '');

  ngOnInit(): void {
    this.loadCommunities();
  }

  loadCommunities(): void {
    this.loading.set(true);
    const params: Record<string, any> = {
      user_id: this.authService.currentUser()?.id ?? 39,
      page: this.currentPage(),
      limit: this.pageSize(),
    };

    this.communityService.getCommunities(params).subscribe({
      next: (response: PaginatedResponse<Community>) => {
        this.communities.set(response.data);
        this.totalPages.set(response.totalPages);
        this.totalItems.set(response.total);
        this.updateJoinedStatus(response.data);
        this.loading.set(false);
      },
      error: () => {
        this.toast.error('Failed to load communities');
        this.loading.set(false);
      },
    });
  }

  private updateJoinedStatus(communities: Community[]): void {
    const userId = this.currentUserId();
    const joinedIds = new Set<number>();
    communities.forEach((community) => {
      // if (community.member_count?.some((m) => m.userId === userId)) {
      //   joinedIds.add(community.community_id);
      // }
    });
    this.joinedCommunityIds.set(joinedIds);
  }

  isJoined(communityId: number): boolean {
    return this.joinedCommunityIds().has(communityId);
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }

  joinCommunity(event: Event, communityId: number): void {
    event.stopPropagation();
    this.joiningId.set(communityId);
    const payload = {
      community_id: communityId,
      user_id: this.currentUserId()
    }

    this.communityService.joinCommunity(payload).subscribe({
      next: () => {
        this.toast.success('Successfully joined the community!');
        this.joinedCommunityIds.update((ids) => {
          const newIds = new Set(ids);
          newIds.add(communityId);
          return newIds;
        });
        // Update member count locally
        this.communities.update((communities) =>
          communities.map((c) =>
            c.community_id == communityId
              ? c
              : c
          )
        );
        this.loadCommunities();
        this.joiningId.set(null);
      },
      error: () => {
        this.toast.error('Failed to join community');
        this.joiningId.set(null);
      },
    });
  }

  leaveCommunity(event: Event, communityId: number): void {
    event.stopPropagation();
    this.leavingId.set(communityId);

    this.communityService.leaveCommunity(communityId).subscribe({
      next: () => {
        this.toast.success('Left the community');
        this.joinedCommunityIds.update((ids) => {
          const newIds = new Set(ids);
          newIds.delete(communityId);
          return newIds;
        });
        // Update member count locally
        this.communities.update((communities) =>
          communities.map((c) =>
            c.community_id === communityId
              ? c
              : c
          )
        );
        this.leavingId.set(null);
      },
      error: () => {
        this.toast.error('Failed to leave community');
        this.leavingId.set(null);
      },
    });
  }

  navigateToCommunity(communityId: string): void {
    this.router.navigate(['/user/community', communityId]);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
    this.loadCommunities();
  }

  getPages(): number[] {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: number[] = [];
    const maxVisible = 5;

    let start = Math.max(1, current - Math.floor(maxVisible / 2));
    let end = Math.min(total, start + maxVisible - 1);
    start = Math.max(1, end - maxVisible + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  truncate(text: string | undefined, length: number): string {
    if (!text) return '';
    return text.length > length ? text.substring(0, length) + '...' : text;
  }

  getStaggerClass(index: number): string {
    return `stagger-${Math.min((index % 6) + 1, 6)}`;
  }
}
