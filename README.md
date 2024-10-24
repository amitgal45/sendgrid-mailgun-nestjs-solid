# NestJS SOLID Email Architecture with SendGrid and Mailgun 📧

A production-ready, SOLID-compliant email system for NestJS applications that seamlessly integrates with SendGrid and Mailgun. This implementation provides a robust, scalable, and maintainable solution for handling email communications in your NestJS applications.

## 🌟 Features

- **Provider Agnostic Design**: Easily switch between SendGrid and Mailgun without changing your application code
- **Template Support**: Built-in templating system using Liquid templating language
- **SOLID Principles**: Fully compliant with SOLID design principles
- **Type Safety**: Complete TypeScript support with comprehensive interfaces
- **Error Handling**: Robust error handling and reporting
- **Database Integration**: TypeORM-based template storage
- **Easy Configuration**: Environment-based configuration for different providers

## 🚀 Installation

```bash
npm install @nestjs/typeorm typeorm pg @sendgrid/mail mailgun.js liquidjs
```

## ⚙️ Configuration

Create a `.env` file in your project root:

```env
# Email Provider Configuration
EMAIL_PROVIDER=sendgrid  # or 'mailgun'
EMAIL_FROM_ADDRESS=noreply@yourdomain.com

# SendGrid Configuration
SENDGRID_API_KEY=your_sendgrid_api_key

# Mailgun Configuration
MAILGUN_API_KEY=your_mailgun_api_key
MAILGUN_DOMAIN=your_mailgun_domain
```

## 📦 Project Structure

```
src/email/
├── constants/
│   └── injection-tokens.ts
├── entities/
│   └── email-template.entity.ts
├── interfaces/
│   ├── email-provider.interface.ts
│   ├── template-engine.interface.ts
│   └── template-repository.interface.ts
├── providers/
│   ├── sendgrid.provider.ts
│   └── mailgun.provider.ts
├── engines/
│   └── liquid-template.engine.ts
├── repositories/
│   └── email-template.repository.ts
├── services/
│   └── email.service.ts
└── email.module.ts
```

## 💡 Usage

1. Import the EmailModule in your `app.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development'],
    }),
    EmailModule.forRoot(),
  ],
})
export class AppModule {}
```

2. Inject and use the EmailService in your application:

```typescript
@Injectable()
export class UserService {
  constructor(private readonly emailService: EmailService) {}

  async createUser(userData: CreateUserDto) {
    await this.emailService.sendTemplatedEmail({
      to: userData.email,
      templateId: 'welcome-email',
      templateData: {
        name: userData.firstName,
        activationLink: `${process.env.FRONTEND_URL}/activate/${activationToken}`
      }
    });
  }
}
```

3. Create email templates in your database:

```sql
INSERT INTO email_template (id, subject, content)
VALUES (
  'welcome-email',
  'Welcome to {{ appName }}, {{ name }}!',
  '<div>
    <h1>Welcome aboard, {{ name }}!</h1>
    <p>We're excited to have you join us. Click below to get started:</p>
    <a href="{{ activationLink }}">Activate Your Account</a>
  </div>'
);
```

## 🏗️ Architecture Highlights

- **Dependency Injection**: Utilizes NestJS's powerful DI system
- **Interface Segregation**: Clean separation of concerns through well-defined interfaces
- **Open/Closed Principle**: Easily extend with new email providers without modifying existing code
- **Single Responsibility**: Each component has a clear, single purpose
- **Template Repository Pattern**: Efficient template management and storage
- **Provider Pattern**: Flexible email provider implementation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


## 🙏 Acknowledgments

- [NestJS Team](https://nestjs.com/) for the amazing framework
- [SendGrid](https://sendgrid.com/) and [Mailgun](https://www.mailgun.com/) for their email services
- [LiquidJS](https://liquidjs.com/) for the templating engine
