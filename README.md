<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 📜 Available Scripts

### 🏗️ Build & Run

| Command               | Description                          | Example                        |
|----------------------|--------------------------------------|--------------------------------|
| `npm run start`      | Run the app in production mode       | `npm run start`               |
| `npm run start:dev`  | Start with watch mode (development)  | `npm run start:dev`           |
| `npm run start:debug`| Start with debugger enabled          | `npm run start:debug`         |
| `npm run start:prod` | Run compiled app from `dist/`        | `npm run start:prod`          |

### 🧪 Testing

| Command              | Description                          |
|---------------------|--------------------------------------|
| `npm run test`       | Run all unit tests with Jest         |
| `npm run test:watch` | Run tests in watch mode              |
| `npm run test:cov`   | Generate test coverage report        |
| `npm run test:debug` | Run tests with debugging enabled     |
| `npm run test:e2e`   | Run end-to-end tests (Jest config)   |

### 🧹 Code Quality

| Command               | Description                             |
|----------------------|-----------------------------------------|
| `npm run lint`        | Run ESLint with autofix                 |
| `npm run format`      | Format files with Prettier              |

### 🛠️ TypeORM CLI

| Command                               | Description                                           | Example                                                                 |
|--------------------------------------|-------------------------------------------------------|-------------------------------------------------------------------------|
| `npm run typeorm`                    | Run TypeORM CLI manually                             | `npm run typeorm schema:log -d typeorm.config.ts`                       |
| `npm run migration:generate`         | Generate migration based on entity changes           | `npm run migration:generate --name=CreateUsersTable`                   |
| `npm run migration:run`              | Run all pending migrations                           | `npm run migration:run`                                                |
| `npm run migration:revert`           | Revert the last executed migration                   | `npm run migration:revert`                                             |
| `npm run migration:revert:all`       | Revert all executed migrations                       | `npm run migration:revert:all`                                         |
| `npm run migration:reset`            | Revert all migrations and re-run them from scratch   | `npm run migration:reset`                                              |

### 🌱 Database Seeding (coming soon)

| Command                 | Description                          |
|------------------------|--------------------------------------|
| `npm run seed:dev`     | Populate the database with test data |
| `npm run seed:reset`   | Reset the DB and re-seed             |


## ✅ Mejora continua del proyecto Haru API

### Checklist de mejoras pendientes

- [ ] Implementar sistema de roles y permisos (RBAC) con `@Roles()` y `RolesGuard`.
- [ ] Persistir logs en archivos rotativos o integrarlos con servicios externos (Sentry, CloudWatch).
- [ ] Agregar pruebas unitarias y de integración (Jest + Supertest).
- [ ] Habilitar CORS y protección por `rateLimit`.
- [ ] Integrar `@nestjs/throttler` para limitar fuerza bruta por IP.
- [ ] Documentar todos los endpoints en Swagger (`@ApiResponse`).
- [ ] Implementar políticas de seguridad: usar `helmet`, validar CORS, Joi para `.env`.
- [ ] Agregar soporte para múltiples `.env` (`.env.local`, `.env.production`, etc.).
- [ ] Crear pipeline de CI/CD con test, lint y deploy automatizado.


## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
