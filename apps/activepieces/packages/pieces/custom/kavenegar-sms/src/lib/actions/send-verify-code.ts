import { createAction, Property } from '@activepieces/pieces-framework';

const KAVENEGAR_API_BASE = 'https://api.kavenegar.com/v1';

export const sendVerifyCode = createAction({
  name: 'send_verify_code',
  displayName: 'Send Verification Code',
  description: 'Send a verification/OTP code via Kavenegar lookup',
  props: {
    receptor: Property.ShortText({
      displayName: 'Recipient Phone Number',
      description: 'Iranian mobile number (e.g., 09121234567)',
      required: true,
    }),
    template: Property.ShortText({
      displayName: 'Template Name',
      description: 'Kavenegar verification template name',
      required: true,
    }),
    token: Property.ShortText({
      displayName: 'Verification Code',
      description: 'The verification/OTP code to send',
      required: true,
    }),
    token2: Property.ShortText({
      displayName: 'Token 2 (Optional)',
      description: 'Second template variable',
      required: false,
    }),
    token3: Property.ShortText({
      displayName: 'Token 3 (Optional)',
      description: 'Third template variable',
      required: false,
    }),
  },
  async run(context) {
    const { receptor, template, token, token2, token3 } =
      context.propsValue;
    const apiKey = context.auth as string;

    const params = new URLSearchParams({
      receptor,
      template,
      token,
      type: 'sms',
    });
    if (token2) params.append('token2', token2);
    if (token3) params.append('token3', token3);

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
