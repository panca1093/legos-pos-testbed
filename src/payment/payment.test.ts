import { describe, expect, it } from "vitest";
import { pay } from "./payment.js";

describe("pay", () => {
  it("returns change for cash", () => {
    expect(pay(33000, { method: "cash", amount: 50000 })).toEqual({ paid: 50000, change: 17000 });
  });

  it("rejects insufficient cash", () => {
    expect(() => pay(33000, { method: "cash", amount: 20000 })).toThrow();
  });
});
