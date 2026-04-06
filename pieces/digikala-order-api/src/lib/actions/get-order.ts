import { createAction, Property } from '@activepieces/pieces-framework';

export const getOrder = createAction({
  name: 'get_order',
  displayName: 'Get Order',
  description: 'Retrieve a single order by ID from Digikala',
  props: {
    orderId: Property.ShortText({
      displayName: 'Order ID',
      description: 'The Digikala order ID to retrieve',
      required: true,
    }),
  },
  async run(context) {
    const { orderId } = context.propsValue;
    const apiKey = context.auth as string;

    // TODO: Replace with actual Digikala internal API endpoint
    const response = await fetch(
      `https://api.internal.digikala.com/v1/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch order ${orderId}: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  },
});
