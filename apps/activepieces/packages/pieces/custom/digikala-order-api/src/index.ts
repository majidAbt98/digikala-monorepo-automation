import { createPiece, PieceAuth } from '@activepieces/pieces-framework';
import { getOrder } from './lib/actions/get-order';
import { listOrders } from './lib/actions/list-orders';
import { newOrderTrigger } from './lib/triggers/new-order';

export const digikalaOrderApi = createPiece({
  displayName: 'Digikala Order API',
  description: 'Interact with Digikala order management system',
  auth: PieceAuth.SecretText({
    displayName: 'API Key',
    description: 'Digikala internal API key',
    required: true,
  }),
  minimumSupportedRelease: '0.36.1',
  logoUrl: 'https://www.digikala.com/favicon.ico',
  authors: ['digikala-automation-team'],
  actions: [getOrder, listOrders],
  triggers: [newOrderTrigger],
});
