import { Component, signal, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Feature {
  icon: string;
  title: string;
  description: string;
  colorClass: string;
}

interface Step {
  number: number;
  icon: string;
  title: string;
  description: string;
}

interface HeroStat {
  target: number;
  suffix: string;
  label: string;
  current: number;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private counterInterval: ReturnType<typeof setInterval> | null = null;

  features = signal<Feature[]>([
    {
      icon: 'bi-people-fill',
      title: 'Communities',
      description: 'Join local communities near you. Connect with neighbours, share updates, and build stronger bonds within your area.',
      colorClass: 'feature-purple',
    },
    {
      icon: 'bi-shop',
      title: 'Businesses',
      description: 'Discover and support local businesses. Find shops, restaurants, and services right in your neighbourhood.',
      colorClass: 'feature-green',
    },
    {
      icon: 'bi-calendar-event-fill',
      title: 'Events',
      description: 'Find exciting events happening near you. From community gatherings to local festivals, never miss out.',
      colorClass: 'feature-orange',
    },
    {
      icon: 'bi-briefcase-fill',
      title: 'Jobs & Help',
      description: 'Explore local job opportunities and get emergency support from your community when you need it most.',
      colorClass: 'feature-pink',
    },
  ]);

  steps = signal<Step[]>([
    {
      number: 1,
      icon: 'bi-person-plus-fill',
      title: 'Register',
      description: 'Create your free account in seconds. Just provide your basic details and your UK postcode to get started.',
    },
    {
      number: 2,
      icon: 'bi-people',
      title: 'Join a Community',
      description: 'Browse and join communities near your location. Connect with people who share your interests and locality.',
    },
    {
      number: 3,
      icon: 'bi-chat-dots-fill',
      title: 'Start Engaging',
      description: 'Post updates, share events, discover businesses, find jobs, and help your neighbours. Your community awaits!',
    },
  ]);

  heroStats = signal<HeroStat[]>([
    { target: 10, suffix: 'K+', label: 'Active Users', current: 0 },
    { target: 500, suffix: '+', label: 'Communities', current: 0 },
    { target: 200, suffix: '+', label: 'Cities', current: 0 },
  ]);

  currentYear = signal(new Date().getFullYear());
  countersStarted = signal(false);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startCounters();
    }
  }

  ngOnDestroy(): void {
    if (this.counterInterval) {
      clearInterval(this.counterInterval);
    }
  }

  private startCounters(): void {
    setTimeout(() => {
      const duration = 2000;
      const totalSteps = 60;
      const interval = duration / totalSteps;
      let step = 0;

      this.counterInterval = setInterval(() => {
        step++;
        const progress = step / totalSteps;
        const eased = 1 - Math.pow(1 - progress, 3);

        this.heroStats.update(stats =>
          stats.map(s => ({
            ...s,
            current: Math.round(s.target * eased),
          }))
        );

        if (step >= totalSteps) {
          if (this.counterInterval) clearInterval(this.counterInterval);
          this.countersStarted.set(true);
        }
      }, interval);
    }, 800);
  }
}
