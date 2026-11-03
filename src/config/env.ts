/**
 * Application Environment Configuration
 * Reads from Vite environment variables (prefixed with VITE_) with fallback defaults.
 * You can configure these in the .env file in the project root.
 */

export const ENV = {
  // API Base URL (e.g. https://your-domain.com/api/v1). Leave empty to use client-side data mode.
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '',

  // WhatsApp Business Number (Digits only with country code, e.g. 88017XXXXXXXX)
  WHATSAPP_NUMBER: import.meta.env.VITE_WHATSAPP_NUMBER || '8801700000000',

  // Display phone number in Bengali text
  PHONE_DISPLAY: import.meta.env.VITE_PHONE_DISPLAY || '+৮৮০ ১৭০০-০০০০০০',

  // Raw phone number for tel: links
  PHONE_RAW: import.meta.env.VITE_PHONE_RAW || '+8801700000000',

  // Support / Contact Email
  CONTACT_EMAIL: import.meta.env.VITE_CONTACT_EMAIL || 'info@foodghor.com',

  // Physical address
  CONTACT_ADDRESS: import.meta.env.VITE_CONTACT_ADDRESS || 'যশোর রোড, বনশ্রী, ঢাকা - ১২১৯',

  // Turnstile Site Key (Optional for Cloudflare bot verification)
  TURNSTILE_SITE_KEY: import.meta.env.VITE_TURNSTILE_SITE_KEY || ''
} as const;
