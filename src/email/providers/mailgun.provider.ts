import { Injectable } from '@nestjs/common';
import {
  EmailResponse,
  IEmailProvider,
} from '../interfaces/email-provider.interface';
import Mailgun from 'mailgun.js';

@Injectable()
export class MailgunProvider implements IEmailProvider {
  private mailgun;
  constructor(
    private readonly apiKey: string,
    private readonly domain: string,
    private readonly fromEmail: string,
  ) {
    const mailgun = new Mailgun(FormData);
    this.mailgun = mailgun.client({ username: 'api', key: this.apiKey });
  }
  async sendEmail(
    to: string,
    subject: string,
    content: string,
  ): Promise<EmailResponse> {
    try {
      const response = await this.mailgun.messages.create(this.domain, {
        from: this.fromEmail,
        to,
        subject,
        html: content,
      });
      return {
        success: true,
        messageId: response.id,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
