import type { Catalog } from "../product/product.js";

export interface Line {
  sku: string;
  qty: number;
  unitPrice: number;
}

export class Cart {
  private lines = new Map<string, Line>();

  constructor(private catalog: Catalog) {}

  add(sku: string, qty = 1): void {
    if (!Number.isInteger(qty) || qty <= 0) throw new Error("qty must be a positive integer");
    const existing = this.lines.get(sku);
    if (existing) {
      existing.qty += qty;
      return;
    }
    this.lines.set(sku, { sku, qty, unitPrice: this.catalog.get(sku).price });
  }

  setQty(sku: string, qty: number): void {
    if (!Number.isInteger(qty) || qty < 0) throw new Error("qty must be a positive integer");
    const existing = this.lines.get(sku);
    if (!existing) throw new Error(`sku not in cart: ${sku}`);
    if (qty === 0) {
      this.lines.delete(sku);
      return;
    }
    existing.qty = qty;
  }

  remove(sku: string): void {
    this.lines.delete(sku);
  }

  items(): Line[] {
    return [...this.lines.values()];
  }

  subtotal(): number {
    return this.items().reduce((sum, l) => sum + l.qty * l.unitPrice, 0);
  }
}
