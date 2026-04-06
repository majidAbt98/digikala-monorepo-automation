import { createAction, Property } from '@activepieces/pieces-framework';

const KAVENEGAR_API_BASE = 'https://api.kavenegar.com/v1';

export const sendSms = createAction({
  name: 'send_sms',
  displayName: 'Send SMS',
  description: 'Send an SMS message via Kavenegar',
  props: {
    receptor: Property.ShortText({
      displayName: 'Recipient Phone Number',
      description: 'Iranian mobile number (e.g., 09121234567)',
      required: true,
    }),
    message: Property.LongText({
      displayName: 'Message',
      description: 'SMS message content',
      required: true,
    }),
    sender: Property.ShortText({
      displayName: 'Sender Number',
      description: 'Sender line number (optional, uses default if empty)',
      required: false,
    }),
  },
  async run(context) {
    const { receptor, message, sender } = context.propsValue;
    const apiKey = context.auth as string;

    const params = new URLSearchParams({
      receptor,
      message,
    });
    if (sender) params.append('sender', sender);

    const response = await fetch(
      `${KAVENEGAR_API_BASE}/${apiKey}/sms/send.json`,
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
