import { createPiece, PieceAuth } from '@activepieces/pieces-framework';
import { sendSms } from './lib/actions/send-sms';
import { sendVerifyCode } from './lib/actions/send-verify-code';
import { sendLookup } from './lib/actions/send-lookup';

export const kavenegarSms = createPiece({
  displayName: 'Kavenegar SMS',
  description: 'Send SMS messages via Kavenegar (Iranian SMS provider)',
  auth: PieceAuth.SecretText({
    displayName: 'API Key',
    description: 'Your Kavenegar API key',
    required: true,
  }),
  minimumSupportedRelease: '0.36.1',
  logoUrl: 'https://kavenegar.com/favicon.ico',
  authors: ['digikala-automation-team'],
  actions: [sendSms, sendVerifyCode, sendLookup],
  triggers: [],
});
