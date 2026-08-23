export const INR_RATE = 80;

export function formatCurrency(amount: number): string {
  const rupees = amount * INR_RATE;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(rupees);
}

export function toRupees(amountInUSD: number): number {
  return amountInUSD * INR_RATE;
}

export function toUSD(amountInRupees: number): number {
  return amountInRupees / INR_RATE;
}
