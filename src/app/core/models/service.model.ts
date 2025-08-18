export interface ServiceCategory {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  isActive: boolean;
}

export interface ServiceDto {
  id: number;
  name: string;
  description?: string | null;   // ServiceDescription
  keyHighlights?: string | null;
  duration?: string | null;

  provider: string;
  price: number;
  discount?: number;             // %
  tax?: number;                  // %

  currency: string;
  status: 'active' | 'inactive' | 'draft';
  icon?: string;
  isActive: boolean;

  inclusions?: string | null;
  exclusions?: string | null;
  termsAndConditions?: string | null;

  videoUrl?: string | null;
  brochureUrl?: string | null;
  image?: string | null;          // base64 or URL

  availableFrom?: string | null;  // ISO date string
  availableUntil?: string | null;
  bookingNotice?: number | null;  // days

  categoryId: number;
  categoryName?: string;

  createdAt: string;
  updatedAt?: string | null;
}

export interface CreateServiceDto {
  name: string;
  description?: string | null;
  keyHighlights?: string | null;
  duration?: string | null;

  provider: string;
  price: number;
  discount?: number;
  tax?: number;

  currency: string;
  status: string;
  icon?: string;
  isActive: boolean;

  inclusions?: string | null;
  exclusions?: string | null;
  termsAndConditions?: string | null;

  videoUrl?: string | null;
  brochureUrl?: string | null;
  image?: string | null;          // base64 or URL

  availableFrom?: string | null;
  availableUntil?: string | null;
  bookingNotice?: number | null;

  categoryId: number;
}

export interface UpdateServiceDto extends CreateServiceDto {
  id: number;
}
