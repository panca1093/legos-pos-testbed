---
type: Business Rule
title: Money and charges
description: Amounts are integer rupiah; service charge is applied before PPN and both round down.
---

# Money and charges

- Every amount is an integer number of rupiah. Never use floating point for money.
- Percent-based amounts (discounts, service charge, tax) are rounded **down** to a whole rupiah.
- Order of charges at checkout: subtotal → discount → **service charge** → **PPN**.
  PPN is computed on the amount that already includes the service charge.
- The service charge rate is configured per outlet; the default is 5%.
