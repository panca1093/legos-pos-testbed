import { describe, expect, it } from "vitest";
import { Cart } from "../cart/cart.js";
import { Catalog } from "../product/product.js";
import { checkout } from "./checkout.js";

describe("checkout", () => {
  const catalog = new Catalog();
  catalog.add({ sku: "KOPI", name: "Kopi susu", price: 18000 });

  it("totals the cart and takes payment", () => {
    const cart = new Cart(catalog);
    cart.add("KOPI", 2);
    const order = checkout(cart, { method: "cash", amount: 40000 });
    expect(order.total).toBe(36000);
    expect(order.payment.change).toBe(4000);
  });

  it("refuses an empty cart", () => {
    expect(() => checkout(new Cart(catalog), { method: "cash", amount: 0 })).toThrow();
  });
});
