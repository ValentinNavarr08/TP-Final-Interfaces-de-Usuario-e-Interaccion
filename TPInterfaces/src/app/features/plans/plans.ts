import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Footer } from '../../shared/components/footer/footer';
import { PlansData } from '../../shared/services/plans-data';
import { Plan } from '../../shared/models/plan';

@Component({
  selector: 'app-plans',
  imports: [Footer],
  templateUrl: './plans.html',
  styleUrl: './plans.css'
})
export class Plans {
  features = ['Mejora 1', 'Mejora 2', 'Mejora 3', 'Mejora 4', 'Mejora 5', 'Mejora 6', 'Mejora 7'];
  plans: Plan[] = [];

  constructor(
    private plansData: PlansData,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.plans = this.plansData.getAll();
  }

  selectPlan(planId: string): void {
    this.router.navigate(['/checkout', planId]);
  }
}