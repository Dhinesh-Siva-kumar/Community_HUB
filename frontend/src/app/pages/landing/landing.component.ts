import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, AfterViewInit, ElementRef, QueryList, ViewChildren, HostListener } from '@angular/core';
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
export class LandingComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private el: ElementRef
  ) {}

  private sectionObserver!: IntersectionObserver;
  private scrollObserver!: IntersectionObserver;
  private readonly sectionIds = ['home', 'features', 'communities', 'about-us', 'how-it-works', 'contact'];

  // Counter animation
  counterValues: { [key: string]: number } = {};
  countersAnimated = false;

  // Navbar
  navbarScrolled = false;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupSectionObserver();
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollAnimations();
      this.setupCounterObserver();
    }
  }

  ngOnDestroy(): void {
    this.sectionObserver?.disconnect();
    this.scrollObserver?.disconnect();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.navbarScrolled = window.scrollY > 50;
    }
  }

  private setupSectionObserver(): void {
    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          this.activeSection = visible[0].target.id;
        }
      },
      { threshold: [0.2, 0.5], rootMargin: '-80px 0px -30% 0px' }
    );

    this.sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) this.sectionObserver.observe(el);
    });
  }

  private setupScrollAnimations(): void {
    this.scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            this.scrollObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    const animatedElements = this.el.nativeElement.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el: Element) => {
      this.scrollObserver.observe(el);
    });
  }

  private setupCounterObserver(): void {
    const statsSection = this.el.nativeElement.querySelector('.lp-hero-stats');
    if (!statsSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.countersAnimated) {
            this.countersAnimated = true;
            this.animateCounters();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(statsSection);
  }

  private animateCounters(): void {
    const targets = [
      { key: 'members', target: 10, suffix: 'K+' },
      { key: 'communities', target: 15, suffix: 'K+' },
      { key: 'posts', target: 2, suffix: 'M+' }
    ];

    targets.forEach(item => {
      let current = 0;
      const increment = item.target / 40;
      const timer = setInterval(() => {
        current += increment;
        if (current >= item.target) {
          current = item.target;
          clearInterval(timer);
        }
        this.counterValues[item.key] = Math.floor(current);
      }, 40);
    });
  }

  getCounterDisplay(key: string, suffix: string): string {
    const val = this.counterValues[key];
    return val !== undefined ? `${val}${suffix}` : `0${suffix}`;
  }

  applicationName = 'Community';
  features = [
    {
      icon: 'bi-people-fill',
      title: 'Join Communities',
      description: 'Discover and join thousands of communities that match your passions, hobbies, and professional interests.',
      color: 'feature-purple',
      gradient: 'gradient-purple'
    },
    {
      icon: 'bi-chat-dots-fill',
      title: 'Share & Discuss',
      description: 'Start conversations, share ideas, post articles, and engage in meaningful discussions with community members.',
      color: 'feature-cyan',
      gradient: 'gradient-cyan'
    },
    {
      icon: 'bi-heart-fill',
      title: 'Meet Your People',
      description: 'Connect with people who share your interests and build lasting relationships across the globe.',
      color: 'feature-pink',
      gradient: 'gradient-pink'
    },
    {
      icon: 'bi-bell-fill',
      title: 'Stay Updated',
      description: 'Stay up to date with instant notifications for replies, mentions, community updates, and new connections.',
      color: 'feature-green',
      gradient: 'gradient-green'
    }
  ];

  communities = [
    {
      icon: 'bi-graph-up-arrow',
      name: 'Entrepreneurs',
      description: 'Connect with founders, investors, and business leaders to share insights and grow your ventures.',
      members: '45K',
      color: 'community-orange',
      badge: 'Business',
      gradient: 'card-gradient-orange'
    },
    {
      icon: 'bi-heart-pulse-fill',
      name: 'Health & Fitness',
      description: 'Share workout routines, fitness tips, and motivate each other to live better.',
      members: '128K',
      color: 'community-purple',
      badge: 'Wellness',
      gradient: 'card-gradient-purple'
    },
    {
      icon: 'bi-cup-hot',
      name: 'Food & Cooking',
      description: 'Share recipes, cooking tips, and culinary experiences with fellow food enthusiasts.',
      members: '64K',
      color: 'community-pink',
      badge: 'Recipes',
      gradient: 'card-gradient-pink'
    },
    {
      icon: 'bi-geo-alt-fill',
      name: 'Travel',
      description: 'Explore new destinations, share experiences, and connect with fellow travelers worldwide.',
      members: '210K',
      color: 'community-blue',
      badge: 'Adventures',
      gradient: 'card-gradient-blue'
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
      number: '01',
      icon: 'bi-person-plus-fill',
      title: 'Create an Account',
      description: "Sign up for free in seconds. No credit card required. Just your email and you're in!"
    },
    {
      number: '02',
      icon: 'bi-compass-fill',
      title: 'Join Communities',
      description: 'Browse and join communities that match your interests, profession, or hobbies.'
    },
    {
      number: '03',
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
