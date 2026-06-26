// src/subscriptions/subscriptions.controller.ts

import { Body, Controller, HttpCode, Post, Query } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(
    private readonly subscriptionsService: SubscriptionsService,
  ) {}

  @Post('create')
  create(@Body() dto: CreateSubscriptionDto) {
    return this.subscriptionsService.createSubscription(dto.userId);
  }

  @Post('webhook')
  @HttpCode(200)
  async webhook(@Query() query: any, @Body() body: any) {
    try {
      return await this.subscriptionsService.handleWebhook(query, body);
    } catch (error) {
      console.error('ERROR EN WEBHOOK MP:', error);
      return { received: true };
    }
  }
}