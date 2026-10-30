export interface Product {
  sku: string;
  name: string;
  price: number; // rupiah, integer
}

export class Catalog {
  private items = new Map<string, Product>();

  add(p: Product): void {
    if (!Number.isInteger(p.price) || p.price < 0) throw new Error(`invalid price for ${p.sku}`);
    this.items.set(p.sku, p);
  }

  get(sku: string): Product {
    const p = this.items.get(sku);
    if (!p) throw new Error(`unknown sku ${sku}`);
    return p;
  }
}
