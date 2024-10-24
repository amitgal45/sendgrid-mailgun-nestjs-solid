import { Injectable } from '@nestjs/common';
import { Liquid } from 'liquidjs';
import { ITemplateEngine } from '../interfaces/template-engine.interface';

@Injectable()
export class LiquidTemplateEngine implements ITemplateEngine {
  private readonly engine: Liquid;
  constructor() {
    this.engine = new Liquid({
      strictVariables: true,
      strictFilters: true,
      cache: true,
    });
  }
  async render(template: string, data: Record<string, any>): Promise<string> {
    try {
      return await this.engine.parseAndRender(template, data);
    } catch (error) {
      throw new Error(`Template rendering failed: ${error.message}`);
    }
  }
  async renderSubject(
    template: string,
    data: Record<string, any>,
  ): Promise<string> {
    return this.render(template, data);
  }
}
