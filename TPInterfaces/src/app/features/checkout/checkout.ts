import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Footer } from '../../shared/components/footer/footer';
import { PlansData } from '../../shared/services/plans-data';
import { Plan } from '../../shared/models/plan';

@Component({
  selector: 'app-checkout',
  imports: [Footer, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {
  plan: Plan | undefined;

  cardNumber = '';
  cardName = '';
  cardExpiry = '';
  cardCvv = '';

  isSubmitting = false;
  isSuccess = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private plansData: PlansData
  ) {}

  ngOnInit(): void {
    const planId = this.route.snapshot.paramMap.get('planId');
    this.plan = planId ? this.plansData.getById(planId) : undefined;

    if (!this.plan) {
      this.router.navigate(['/plans']);
    }
  }

  onCardNumberInput(): void {
    const digits = this.cardNumber.replace(/\D/g, '').slice(0, 16);
    this.cardNumber = digits.replace(/(.{4})/g, '$1 ').trim();
  }

  onExpiryInput(): void {
    const digits = this.cardExpiry.replace(/\D/g, '').slice(0, 4);
    this.cardExpiry = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  }

  onCvvInput(): void {
    this.cardCvv = this.cardCvv.replace(/\D/g, '').slice(0, 4);
  }

  get isFormValid(): boolean {
    return (
      this.cardNumber.replace(/\s/g, '').length === 16 &&
      this.cardName.trim().length > 2 &&
      /^\d{2}\/\d{2}$/.test(this.cardExpiry) &&
      this.cardCvv.length >= 3
    );
  }

  onSubmit(): void {
    if (!this.isFormValid) return;

    this.isSubmitting = true;

    // Sin backend real de pagos: simulamos la confirmación.
    setTimeout(() => {
      this.isSubmitting = false;
      this.isSuccess = true;
    }, 1200);
  }
}
