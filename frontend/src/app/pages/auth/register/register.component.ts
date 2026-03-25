import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  currentStep = signal(1);
  loading = signal(false);
  showPassword = signal(false);
  totalSteps = 3;

  interestOptions = [
    'Sports',
    'Arts',
    'Music',
    'Food',
    'Technology',
    'Education',
    'Health',
    'Travel',
    'Business',
    'Social',
  ];

  professionalCategories = [
    'Healthcare',
    'Technology',
    'Education',
    'Business',
    'Arts',
    'Trades',
    'Other',
  ];

  // Step 1: Basic Info
  step1Form: FormGroup = this.fb.group(
    {
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: this.passwordMatchValidator }
  );

  // Step 2: Location
  step2Form: FormGroup = this.fb.group({
    country: ['UK', [Validators.required]],
    location: ['', [Validators.required]],
    pincode: ['', [Validators.required]],
  });

  // Step 3: Interests
  step3Form: FormGroup = this.fb.group({
    interests: [[] as string[], [Validators.required, Validators.minLength(1)]],
    professionalCategory: ['', [Validators.required]],
  });

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  get currentForm(): FormGroup {
    switch (this.currentStep()) {
      case 1:
        return this.step1Form;
      case 2:
        return this.step2Form;
      case 3:
        return this.step3Form;
      default:
        return this.step1Form;
    }
  }

  get f1() {
    return this.step1Form.controls;
  }

  get f2() {
    return this.step2Form.controls;
  }

  get f3() {
    return this.step3Form.controls;
  }

  nextStep(): void {
    if (this.currentForm.invalid) {
      this.currentForm.markAllAsTouched();
      return;
    }
    if (this.currentStep() < this.totalSteps) {
      this.currentStep.update((s) => s + 1);
    }
  }

  prevStep(): void {
    if (this.currentStep() > 1) {
      this.currentStep.update((s) => s - 1);
    }
  }

  toggleInterest(interest: string): void {
    const current: string[] = this.step3Form.get('interests')?.value || [];
    const index = current.indexOf(interest);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(interest);
    }
    this.step3Form.patchValue({ interests: [...current] });
    this.step3Form.get('interests')?.markAsTouched();
  }

  isInterestSelected(interest: string): boolean {
    const current: string[] = this.step3Form.get('interests')?.value || [];
    return current.includes(interest);
  }

  onSubmit(): void {
    if (this.step3Form.invalid) {
      this.step3Form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const userData = {
      ...this.step1Form.value,
      ...this.step2Form.value,
      ...this.step3Form.value,
    };
    // Remove confirmPassword before sending
    delete userData.confirmPassword;

    this.authService.register(userData).subscribe({
      next: () => {
        this.loading.set(false);
        this.toastService.success('Account created successfully! Welcome to the community.');
        this.router.navigate(['/user/dashboard']);
      },
      error: (err) => {
        this.loading.set(false);
        this.toastService.error(err?.error?.message || 'Registration failed. Please try again.');
      },
    });
  }
}
