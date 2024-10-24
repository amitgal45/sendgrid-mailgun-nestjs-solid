import { EmailTemplate } from '../entities/template-email.entity';

export interface ITemplateRepository {
  findById(id: string): Promise<EmailTemplate>;
}
