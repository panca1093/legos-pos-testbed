export interface Payment {
  method: "cash";
  amount: number;
}

export interface PaymentResult {
  paid: number;
  change: number;
}

export function pay(total: number, p: Payment): PaymentResult {
  if (p.amount < total) throw new Error(`insufficient payment: ${p.amount} < ${total}`);
  return { paid: p.amount, change: p.amount - total };
}
