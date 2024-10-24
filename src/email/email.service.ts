import { Injectable, Inject } from '@nestjs/common';
import { INJECTION_TOKENS } from './constant/injection-tokens';
import { ITemplateEngine } from './interfaces/template-engine.interface';
import { ITemplateRepository } from './interfaces/template-repository.interface';
import {
  EmailResponse,
  IEmailProvider,
} from './interfaces/email-provider.interface';

export interface EmailData {
  to: string;
  templateId: string;
  templateData: Record<string, any>;
}

@Injectable()
export class EmailService {
  constructor(
    @Inject(INJECTION_TOKENS.EMAIL_PROVIDER)
    private readonly emailProvider: IEmailProvider,
    @Inject(INJECTION_TOKENS.TEMPLATE_ENGINE)
    private readonly templateEngine: ITemplateEngine,
    @Inject(INJECTION_TOKENS.TEMPLATE_REPOSITORY)
    private readonly templateRepository: ITemplateRepository,
  ) {}

  async sendTemplatedEmail(emailData: EmailData): Promise<EmailResponse> {
    try {
      const template = await this.templateRepository.findById(
        emailData.templateId,
      );
      const [renderedSubject, renderedContent] = await Promise.all([
        this.templateEngine.renderSubject(
          template.subject,
          emailData.templateData,
        ),
        this.templateEngine.render(template.content, emailData.templateData),
      ]);
      return await this.emailProvider.sendEmail(
        emailData.to,
        renderedSubject,
        renderedContent,
      );
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
