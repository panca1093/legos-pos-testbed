import { describe, expect, it } from "vitest";
import { Catalog } from "./product.js";

describe("Catalog", () => {
  it("returns a product by sku", () => {
    const c = new Catalog();
    c.add({ sku: "KOPI", name: "Kopi susu", price: 18000 });
    expect(c.get("KOPI").name).toBe("Kopi susu");
  });

  it("rejects unknown skus and invalid prices", () => {
    const c = new Catalog();
    expect(() => c.get("NOPE")).toThrow();
    expect(() => c.add({ sku: "X", name: "X", price: -1 })).toThrow();
  });
});
