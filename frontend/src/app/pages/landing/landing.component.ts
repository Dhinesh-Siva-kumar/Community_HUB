import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  private observer!: IntersectionObserver;
  private readonly sectionIds = ['home', 'features', 'communities', 'about-us', 'how-it-works', 'contact'];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private setupIntersectionObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          this.activeSection = visible[0].target.id;
        }
      },
      {
        threshold: [0.2, 0.5],
        rootMargin: '-80px 0px -30% 0px'
      }
    );

    this.sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) this.observer.observe(el);
    });
  }

  applicationName = 'Community';
  features = [
    {
      icon: 'bi-people-fill',
      title: 'Join Communities',
      description: 'Discover and join thousands of communities that match your passions, hobbies, and professional interests.',
      color: 'feature-purple'
    },
    {
      icon: 'bi-chat-dots-fill',
      title: 'Share Posts & Discussions',
      description: 'Start conversations, share ideas, post articles, and engage in meaningful discussions with community members.',
      color: 'feature-blue'
    },
    {
      icon: 'bi-heart-fill',
      title: 'Meet Like-Minded People',
      description: 'Connect with people who share your interests and build lasting relationships across the globe.',
      color: 'feature-pink'
    },
    {
      icon: 'bi-bell-fill',
      title: 'Real-Time Notifications',
      description: 'Stay up to date with instant notifications for replies, mentions, community updates, and new connections.',
      color: 'feature-green'
    }
  ];

  communities = [
    {
      icon: 'bi-graph-up-arrow',
      name: 'Entrepreneurs',
      description: 'Connect with founders, investors, and business leaders to share insights and grow your ventures.',
      members: '45K',
      color: 'community-orange',
      badge: 'Business'
    },
    {
      icon: 'bi-heart-pulse-fill',
      name: 'Health & Fitness',
      description: 'Connect with people who want to stay healthy, share workout routines, fitness tips, and motivate each other to live better.',
      members: '128K',
      color: 'community-purple',
      badge: 'Wellness'
    },
    {
      icon: 'bi-cup-hot',
      name: 'Food & Cooking',
      description: 'Share recipes, cooking tips, and culinary experiences with fellow food enthusiasts.',
      members: '64K',
      color: 'community-pink',
      badge: 'Recipes'
    },
    {
      icon: 'bi-geo-alt-fill',
      name: 'Travel',
      description: 'Explore new destinations, share travel experiences, and connect with fellow travelers around the world.',
      members: '210K',
      color: 'community-blue',
      badge: 'Adventures'
    }
  ];

  teamStats = [
    { icon: 'bi-calendar2-heart-fill', value: '2026', label: 'Founded' },
    { icon: 'bi-people-fill',          value: '10K+',  label: 'Active Members' },
    { icon: 'bi-globe2',               value: '150+',  label: 'Countries' },
    { icon: 'bi-collection-fill',      value: '15K+',  label: 'Communities' }
  ];

  coreValues = [
    {
      icon: 'bi-shield-fill-check',
      title: 'Inclusivity',
      description: 'We build spaces where everyone feels welcome, respected, and heard — regardless of background or belief.',
      color: 'value-purple'
    },
    {
      icon: 'bi-lightbulb-fill',
      title: 'Innovation',
      description: 'We constantly evolve our platform with new features that help communities grow, engage, and thrive.',
      color: 'value-yellow'
    },
    {
      icon: 'bi-lock-fill',
      title: 'Privacy & Trust',
      description: "Your data is yours. We never sell it, never misuse it, and always put our members' safety first.",
      color: 'value-green'
    }
  ];

  steps = [
    {
      number: '1',
      icon: 'bi-person-plus-fill',
      title: 'Create an Account',
      description: "Sign up for free in seconds. No credit card required. Just your email and you're in!"
    },
    {
      number: '2',
      icon: 'bi-compass-fill',
      title: 'Join Communities',
      description: 'Browse and join communities that match your interests, profession, or hobbies.'
    },
    {
      number: '3',
      icon: 'bi-send-fill',
      title: 'Share & Interact',
      description: 'Post content, comment on discussions, and engage with members who share your passion.'
    }
  ];

  mobileMenuOpen = false;
  activeSection = 'home';

  contact = { firstName: '', lastName: '', email: '', subject: '', message: '' };
  contactSubmitted = false;

  submitContact(): void {
    this.contactSubmitted = true;
  }

  resetContactForm(): void {
    this.contact = { firstName: '', lastName: '', email: '', subject: '', message: '' };
    this.contactSubmitted = false;
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  setActiveSection(section: string): void {
    this.activeSection = section;
  }
}
