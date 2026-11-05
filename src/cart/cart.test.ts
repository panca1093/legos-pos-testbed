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

  it("setQty replaces the quantity and updates subtotal", () => {
    const cart = new Cart(catalog());
    cart.add("KOPI", 2);
    cart.setQty("KOPI", 5);
    expect(cart.items()[0].qty).toBe(5);
    expect(cart.subtotal()).toBe(5 * 18000);
  });

  it("setQty to 0 removes the line", () => {
    const cart = new Cart(catalog());
    cart.add("KOPI", 2);
    cart.setQty("KOPI", 0);
    expect(cart.items()).toHaveLength(0);
    expect(cart.subtotal()).toBe(0);
  });

  it("setQty rejects negative and non-integer quantities", () => {
    const cart = new Cart(catalog());
    cart.add("KOPI", 2);
    for (const q of [-1, 1.5, NaN]) {
      expect(() => cart.setQty("KOPI", q)).toThrow("qty must be a positive integer");
    }
    expect(cart.items()[0].qty).toBe(2);
  });

  it("setQty throws for a sku not in the cart and leaves the cart unchanged", () => {
    const cart = new Cart(catalog());
    cart.add("KOPI", 2);
    expect(() => cart.setQty("ROTI", 1)).toThrow();
    expect(cart.items()).toHaveLength(1);
    expect(cart.subtotal()).toBe(2 * 18000);
  });
});
