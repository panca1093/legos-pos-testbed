import type { Cart, Line } from "../cart/cart.js";
import { pay, type Payment, type PaymentResult } from "../payment/payment.js";

export interface Order {
  lines: Line[];
  total: number;
  payment: PaymentResult;
}

export function checkout(cart: Cart, p: Payment): Order {
  const lines = cart.items();
  if (lines.length === 0) throw new Error("cart is empty");
  const total = cart.subtotal();
  return { lines, total, payment: pay(total, p) };
}
