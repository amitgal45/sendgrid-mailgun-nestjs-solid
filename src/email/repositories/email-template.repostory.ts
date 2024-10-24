import { Injectable, NotFoundException } from '@nestjs/common';
import { ITemplateRepository } from '../interfaces/template-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailTemplate } from '../entities/template-email.entity';

@Injectable()
export class EmailTemplateRepository implements ITemplateRepository {
  constructor(
    @InjectRepository(EmailTemplate)
    private readonly repository: Repository<EmailTemplate>,
  ) {}
  async findById(id: string): Promise<EmailTemplate> {
    const template = await this.repository.findOne({ where: { id } });
    if (!template) {
      throw new NotFoundException(`Template ${id} not found`);
    }
    return template;
  }
}
