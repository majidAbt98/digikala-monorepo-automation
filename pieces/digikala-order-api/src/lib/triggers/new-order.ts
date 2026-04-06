import {
  createTrigger,
  TriggerStrategy,
} from '@activepieces/pieces-framework';

export const newOrderTrigger = createTrigger({
  name: 'new_order',
  displayName: 'New Order',
  description: 'Triggers when a new order is placed on Digikala',
  type: TriggerStrategy.WEBHOOK,
  props: {},
  sampleData: {
    orderId: 'DKC-123456789',
    status: 'pending',
    totalAmount: 15000000,
    currency: 'IRR',
    customer: {
      id: 'cust_001',
      name: 'Ali Ahmadi',
      phone: '09121234567',
    },
    items: [
      {
        productId: 'DKP-987654',
        title: 'Sample Product',
        quantity: 1,
        price: 15000000,
      },
    ],
    createdAt: '2026-04-06T12:00:00Z',
  },
  async onEnable(context) {
    // Register webhook with Digikala order system
    // TODO: Implement webhook registration with Digikala internal API
    console.log('Webhook registered for new orders');
  },
  async onDisable(context) {
    // Deregister webhook
    // TODO: Implement webhook deregistration
    console.log('Webhook deregistered for new orders');
  },
  async run(context) {
    return [context.payload.body];
  },
});
