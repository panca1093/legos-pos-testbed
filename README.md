# legos-pos-testbed

A tiny point-of-sale core used to exercise legos-factory work orders. Prices are integer rupiah.

| Package | Does |
|---|---|
| `src/product` | catalog of products by SKU |
| `src/cart` | cart lines and subtotal |
| `src/payment` | cash payment and change (protected path in the factory project) |
| `src/checkout` | turns a cart and a payment into an order |

```bash
npm ci && npm run typecheck && npm test
```

Work order ideas, smallest first:

- Add a percentage discount to the cart total.
- Add 11% PPN tax to checkout, rounded to the nearest rupiah.
- Produce a plain-text receipt from an order.
- Track stock in the catalog and deduct it at checkout.
- Accept QRIS payments next to cash.
