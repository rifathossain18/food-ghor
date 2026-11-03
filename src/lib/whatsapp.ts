import { BN } from '../content/bn';

/**
 * Creates a WhatsApp direct click-to-chat URL with prefilled Bengali message.
 * @param phone Clean phone digits without '+' (e.g. '8801700000000')
 * @param message Prefilled text to be URI encoded
 */
export function waLink(phone?: string, message?: string): string {
  const targetNumber = (phone || BN.brand.whatsappNumber).replace(/[^0-9]/g, '');
  const defaultMsg = 'আসসালামু আলাইকুম, ফুড ঘর। আমি গুড় অর্ডার করার বিষয়ে জানতে চাই।';
  const text = encodeURIComponent(message || defaultMsg);
  return `https://wa.me/${targetNumber}?text=${text}`;
}

/**
 * Generates WhatsApp message specifically for an inquiry about a product
 */
export function waProductLink(productNameBn: string, quantityText: string = ''): string {
  const qtyClause = quantityText ? ` (পরিমাণ: ${quantityText})` : ' (পরিমাণ: __)';
  const msg = `আসসালামু আলাইকুম। আমি "${productNameBn}" সম্পর্কে জানতে চাই।${qtyClause}`;
  return waLink(BN.brand.whatsappNumber, msg);
}
