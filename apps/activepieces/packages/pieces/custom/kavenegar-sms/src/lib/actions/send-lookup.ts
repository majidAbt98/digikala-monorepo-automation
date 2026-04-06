import { createAction, Property } from '@activepieces/pieces-framework';

const KAVENEGAR_API_BASE = 'https://api.kavenegar.com/v1';

export const sendLookup = createAction({
  name: 'send_lookup',
  displayName: 'Send Template Message',
  description: 'Send a templated SMS message via Kavenegar lookup API',
  props: {
    receptor: Property.ShortText({
      displayName: 'Recipient Phone Number',
      description: 'Iranian mobile number (e.g., 09121234567)',
      required: true,
    }),
    template: Property.ShortText({
      displayName: 'Template Name',
      description: 'Kavenegar template name registered in your panel',
      required: true,
    }),
    token: Property.ShortText({
      displayName: 'Token',
      description: 'First template variable value',
      required: true,
    }),
    token2: Property.ShortText({
      displayName: 'Token 2',
      description: 'Second template variable value',
      required: false,
    }),
    token3: Property.ShortText({
      displayName: 'Token 3',
      description: 'Third template variable value',
      required: false,
    }),
    token10: Property.ShortText({
      displayName: 'Token 10',
      description: 'Fourth template variable value',
      required: false,
    }),
    token20: Property.ShortText({
      displayName: 'Token 20',
      description: 'Fifth template variable value',
      required: false,
    }),
  },
  async run(context) {
    const { receptor, template, token, token2, token3, token10, token20 } =
      context.propsValue;
    const apiKey = context.auth as string;

    const params = new URLSearchParams({
      receptor,
      template,
      token,
    });
    if (token2) params.append('token2', token2);
    if (token3) params.append('token3', token3);
    if (token10) params.append('token10', token10);
    if (token20) params.append('token20', token20);

    const response = await fetch(
      `${KAVENEGAR_API_BASE}/${apiKey}/verify/lookup.json`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      }
    );

    const data = await response.json();

    if (data.return?.status !== 200) {
      throw new Error(
        `Kavenegar API error: ${data.return?.message || 'Unknown error'}`
      );
    }

    return data;
  },
});
