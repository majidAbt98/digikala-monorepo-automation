# Custom Pieces Development Guide

## Overview

Activepieces uses a plugin system called "Pieces" for integrations. Each piece is a TypeScript npm package that defines actions (things the automation can do) and triggers (events that start an automation).

## Piece Structure

```
pieces/my-piece/
  package.json
  src/
    index.ts              # Piece definition (entry point)
    lib/
      actions/
        my-action.ts      # Action implementations
      triggers/
        my-trigger.ts     # Trigger implementations
```

## Creating a New Piece

### 1. Define the Piece (src/index.ts)

```typescript
import { createPiece, PieceAuth } from '@activepieces/pieces-framework';
import { myAction } from './lib/actions/my-action';
import { myTrigger } from './lib/triggers/my-trigger';

export const myPiece = createPiece({
  displayName: 'My Service',
  description: 'Integration with My Service',
  auth: PieceAuth.SecretText({
    displayName: 'API Key',
    required: true,
  }),
  minimumSupportedRelease: '0.36.1',
  logoUrl: 'https://example.com/logo.png',
  authors: ['digikala-automation-team'],
  actions: [myAction],
  triggers: [myTrigger],
});
```

### 2. Create an Action

```typescript
import { createAction, Property } from '@activepieces/pieces-framework';

export const myAction = createAction({
  name: 'my_action',
  displayName: 'Do Something',
  description: 'Performs an action on My Service',
  props: {
    inputField: Property.ShortText({
      displayName: 'Input',
      required: true,
    }),
  },
  async run(context) {
    const { inputField } = context.propsValue;
    const apiKey = context.auth as string;

    const response = await fetch('https://api.example.com/action', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: inputField }),
    });

    return await response.json();
  },
});
```

### 3. Create a Trigger

```typescript
import { createTrigger, TriggerStrategy } from '@activepieces/pieces-framework';

export const myTrigger = createTrigger({
  name: 'my_trigger',
  displayName: 'New Event',
  description: 'Triggers on a new event',
  type: TriggerStrategy.WEBHOOK,
  props: {},
  sampleData: { id: '123', event: 'created' },
  async onEnable(context) {
    // Register webhook
  },
  async onDisable(context) {
    // Deregister webhook
  },
  async run(context) {
    return [context.payload.body];
  },
});
```

## Digikala-Specific Pieces Roadmap

### Priority 1 — Core
- [x] `digikala-order-api` — Order management (scaffold ready)
- [x] `kavenegar-sms` — SMS via Kavenegar (scaffold ready)
- [ ] `zarinpal-payment` — Zarinpal payment gateway
- [ ] `digipay` — DigiPay integration
- [ ] `digikala-seller-panel` — Seller management

### Priority 2 — Operations
- [ ] `jalali-date` — Persian/Shamsi date utilities
- [ ] `digikala-shipping` — Tipax, Post, Mahex, SnapBox
- [ ] `digikala-crm` — Internal ticketing
- [ ] `digikala-analytics` — BI/reporting

### Priority 3 — Communication
- [ ] `bale-messenger` — Bale messaging
- [ ] `eitaa` — Eitaa social platform
- [ ] `rubika` — Rubika super-app

## Property Types Reference

| Type | Usage |
|---|---|
| `Property.ShortText` | Single-line text input |
| `Property.LongText` | Multi-line text input |
| `Property.Number` | Numeric input |
| `Property.Checkbox` | Boolean toggle |
| `Property.StaticDropdown` | Fixed options dropdown |
| `Property.DynamicDropdown` | API-fetched options |
| `Property.DateTime` | Date/time picker |
| `Property.File` | File upload |
| `Property.Json` | JSON object input |
| `Property.Array` | Array of values |

## Authentication Types

| Type | Usage |
|---|---|
| `PieceAuth.SecretText` | API key or token |
| `PieceAuth.BasicAuth` | Username + password |
| `PieceAuth.OAuth2` | OAuth 2.0 flow |
| `PieceAuth.CustomAuth` | Custom fields |

## References

- [Activepieces Pieces Framework](https://www.activepieces.com/docs/build-pieces/misc/build-piece)
- [Activepieces GitHub - Pieces Examples](https://github.com/activepieces/activepieces/tree/main/packages/pieces/)
