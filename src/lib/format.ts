const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

/**
 * Converts any number or string of Latin digits into Bengali digits (০১২৩৪৫৬৭৮৯)
 */
export function toBengaliNumerals(input: number | string | null | undefined): string {
  if (input === null || input === undefined) return '';
  const str = input.toString();
  return str.replace(/[0-9]/g, (match) => {
    const digit = parseInt(match, 10);
    return BENGALI_DIGITS[digit] ?? match;
  });
}

/**
 * Formats a currency amount in BDT using Bengali numerals and symbol: ৳ ৪৮০
 */
export function formatBDT(amount: number | string): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return '৳ ০';
  // integer or 2 decimal places if has decimals
  const formattedNumber = num % 1 === 0 ? num.toString() : num.toFixed(2);
  return `৳ ${toBengaliNumerals(formattedNumber)}`;
}

/**
 * Formats weight in grams or kilograms with Bengali numerals: ৫০০ গ্রাম or ১ কেজি
 */
export function formatWeight(grams: number | null | undefined): string {
  if (!grams) return '';
  if (grams >= 1000 && grams % 1000 === 0) {
    return `${toBengaliNumerals(grams / 1000)} কেজি`;
  }
  return `${toBengaliNumerals(grams)} গ্রাম`;
}
