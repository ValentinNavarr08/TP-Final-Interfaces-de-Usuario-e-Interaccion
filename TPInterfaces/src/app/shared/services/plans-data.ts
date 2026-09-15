import { Injectable } from '@angular/core';
import { Plan } from '../models/plan';

@Injectable({
  providedIn: 'root'
})
export class PlansData {
  private plans: Plan[] = [
    {
      id: 'silver',
      tagline: 'SILVER',
      taglineColor: 'rgba(255,255,255,0.5)',
      price: 10,
      cardClass: 'plan-card-silver',
      icons: ['hd', 'user-plus', 'monitor', 'captions', 'settings'],
    },
    {
      id: 'gold',
      tagline: 'GOLD',
      taglineColor: '#FFCC00',
      price: 50,
      cardClass: 'plan-card-gold',
      icons: ['star', 'hd', 'user-plus', 'monitor', 'fast-forward', 'tv', 'captions', 'download', 'cast', 'settings'],
    },
    {
      id: 'emerald',
      tagline: 'EMERALD',
      taglineColor: '#4ADE80',
      price: 70,
      cardClass: 'plan-card-emerald',
      icons: ['star', 'user-plus', 'hd', 'monitor', 'fast-forward', 'tv', 'download', 'cast', 'settings', 'captions'],
    },
    {
      id: 'diamond',
      tagline: 'DIAMOND',
      taglineColor: '#67E8F9',
      price: 90,
      cardClass: 'plan-card-diamond',
      icons: ['star', 'hd', 'user-plus', 'monitor', 'no-ads', 'fast-forward', 'tv', 'captions', 'download', 'cast', 'settings', 'gem', 'tag', 'expand'],
    },
  ];

  getAll(): Plan[] {
    return this.plans;
  }

  getById(id: string): Plan | undefined {
    return this.plans.find(p => p.id === id);
  }
}