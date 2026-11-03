export type StockStatus = 'in_stock' | 'out_of_stock' | 'preorder';
export type InquiryType = 'retail' | 'wholesale';
export type InquiryStatus = 'new' | 'contacted' | 'converted' | 'closed';

export type Category = {
  id: number;
  slug: string;
  name_bn: string;
  description_bn?: string | null;
  sort_order: number;
  is_active: number;
  created_at?: string;
  updated_at?: string;
};

export type Product = {
  id: number;
  category_id: number;
  slug: string;
  name_bn: string;
  short_desc_bn: string;
  long_desc_bn?: string | null;
  price_bdt: number;
  weight_grams?: number | null;
  stock_status: StockStatus;
  image_primary: string;
  images_json?: string[] | null;
  is_featured: number;
  is_active: number;
  meta_title_bn?: string | null;
  meta_desc_bn?: string | null;
  category_name_bn?: string;
  created_at?: string;
  updated_at?: string;
};

export type Testimonial = {
  id: number;
  customer_name_bn: string;
  customer_location_bn?: string | null;
  quote_bn: string;
  rating: number;
  avatar_url?: string | null;
  sort_order: number;
  is_active: number;
  created_at?: string;
};

export type InquiryPayload = {
  name: string;
  phone: string;
  email?: string;
  product_id?: number | null;
  quantity?: number | string | null;
  inquiry_type: InquiryType;
  message?: string;
  website?: string; // honeypot
  cf_token?: string;
  source_page?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

export type ApiEnvelope<T> = {
  data: T | null;
  meta: Record<string, unknown>;
  error: {
    code: string;
    message: string;
    fields?: Record<string, string>;
  } | null;
};
