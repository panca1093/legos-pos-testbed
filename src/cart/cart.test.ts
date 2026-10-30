import { describe, expect, it } from "vitest";
import { Catalog } from "../product/product.js";
import { Cart } from "./cart.js";

function catalog(): Catalog {
  const c = new Catalog();
  c.add({ sku: "KOPI", name: "Kopi susu", price: 18000 });
  c.add({ sku: "ROTI", name: "Roti bakar", price: 15000 });
  return c;
}

describe("Cart", () => {
  it("sums lines and merges repeated skus", () => {
    const cart = new Cart(catalog());
    cart.add("KOPI", 2);
    cart.add("ROTI");
    cart.add("KOPI");
    expect(cart.items()).toHaveLength(2);
    expect(cart.subtotal()).toBe(3 * 18000 + 15000);
  });

  it("removes a line", () => {
    const cart = new Cart(catalog());
    cart.add("KOPI");
    cart.remove("KOPI");
    expect(cart.subtotal()).toBe(0);
  });

  it("rejects non-positive quantities", () => {
    expect(() => new Cart(catalog()).add("KOPI", 0)).toThrow();
  });
});
