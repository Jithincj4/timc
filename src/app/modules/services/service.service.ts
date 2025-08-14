import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface ServiceItem {
  id: string;
  name: string;
  code: string;
  category: string;
  icon: string;
  provider: string;
  price: string;
  status: 'active' | 'inactive' | 'draft';
  duration?: string;
  discountPercentage?: number;
  taxPercentage?: number;
  description?: string;
  highlights?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private services: ServiceItem[] = [
    {
      id: '1',
      name: 'Cardiac Surgery',
      code: 'CS001',
      category: 'Medical Procedure',
      icon: 'fa-heartbeat',
      provider: 'Global Hospital',
      price: '$5000',
      status: 'active',
      duration: '5 days',
      discountPercentage: 10,
      taxPercentage: 5,
      description: 'Advanced heart surgery by leading specialists.',
      highlights: 'Includes pre-surgery tests, surgery, and post-op care'
    },
    {
      id: '2',
      name: 'Wellness Retreat',
      code: 'WR101',
      category: 'Wellness Package',
      icon: 'fa-spa',
      provider: 'Ocean View Resort',
      price: '$1200',
      status: 'inactive',
      duration: '7 days',
      discountPercentage: 0,
      taxPercentage: 5,
      description: 'Relax and rejuvenate with spa treatments and yoga.',
      highlights: 'Full board accommodation, spa access, yoga sessions'
    },
    {
      id: '3',
      name: 'MRI Scan',
      code: 'MRI001',
      category: 'Diagnostic',
      icon: 'fa-x-ray',
      provider: 'City Diagnostic Center',
      price: '$300',
      status: 'active',
      duration: '1 day',
      discountPercentage: 5,
      taxPercentage: 5,
      description: 'High resolution MRI scan for accurate diagnosis.',
      highlights: 'Includes consultation with radiologist'
    }
  ];

  getAllServices(): Observable<ServiceItem[]> {
    return of(this.services);
  }

  getServiceById(id: string): Observable<ServiceItem | undefined> {
    const service = this.services.find(s => s.id === id);
    return of(service);
  }

  updateService(id: string, updatedData: Partial<ServiceItem>): Observable<ServiceItem | undefined> {
    const index = this.services.findIndex(s => s.id === id);
    if (index > -1) {
      this.services[index] = { ...this.services[index], ...updatedData };
      return of(this.services[index]);
    }
    return of(undefined);
  }

  createService(newService: ServiceItem): Observable<ServiceItem> {
    this.services.push(newService);
    return of(newService);
  }

  deleteService(id: string): Observable<boolean> {
    const index = this.services.findIndex(s => s.id === id);
    if (index > -1) {
      this.services.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}
