import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USERNAME ?? 'admin',
      password: process.env.DB_PASSWORD ?? 'admin',
      database: process.env.DB_DATABASE ?? 'locosxferro',
      autoLoadEntities: true,
      synchronize: true,
    }),

    UsersModule,
    AuthModule,
    SubscriptionsModule,

  ],
})
export class AppModule {}