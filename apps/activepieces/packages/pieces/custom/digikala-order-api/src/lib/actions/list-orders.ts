import { createAction, Property } from '@activepieces/pieces-framework';

export const listOrders = createAction({
  name: 'list_orders',
  displayName: 'List Orders',
  description: 'List orders from Digikala with optional filters',
  props: {
    status: Property.StaticDropdown({
      displayName: 'Order Status',
      description: 'Filter by order status',
      required: false,
      options: {
        options: [
          { label: 'Pending', value: 'pending' },
          { label: 'Processing', value: 'processing' },
          { label: 'Shipped', value: 'shipped' },
          { label: 'Delivered', value: 'delivered' },
          { label: 'Cancelled', value: 'cancelled' },
          { label: 'Returned', value: 'returned' },
        ],
      },
    }),
    limit: Property.Number({
      displayName: 'Limit',
      description: 'Maximum number of orders to return',
      required: false,
      defaultValue: 50,
    }),
    page: Property.Number({
      displayName: 'Page',
      description: 'Page number for pagination',
      required: false,
      defaultValue: 1,
    }),
  },
  async run(context) {
    const { status, limit, page } = context.propsValue;
    const apiKey = context.auth as string;

    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (limit) params.append('limit', String(limit));
    if (page) params.append('page', String(page));

    // TODO: Replace with actual Digikala internal API endpoint
    const response = await fetch(
      `https://api.internal.digikala.com/v1/orders?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to list orders: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  },
});
