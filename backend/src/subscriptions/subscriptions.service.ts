import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createSubscription(userId: number) {
    
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    

    const payerEmail = this.getPayerEmail(user);

    console.log('MP_ACCESS_TOKEN existe:', !!process.env.MP_ACCESS_TOKEN);
    console.log('MP_ACCESS_TOKEN empieza con:', process.env.MP_ACCESS_TOKEN?.slice(0, 12));
    
    const response = await fetch('https://api.mercadopago.com/preapproval', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reason: 'Suscripción mensual Locos x Ferro',
        external_reference: String(user.id),
        
        payer_email: payerEmail ,

        auto_recurring: {
          frequency: 1,
          frequency_type: 'months',
          transaction_amount: 1000,
          currency_id: 'ARS',
        },

        back_url: `${process.env.FRONTEND_LOCAL_URL}/suscripcion/exito`,

        status: 'pending',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      throw new Error('Error creando suscripción en Mercado Pago');
    }

    await this.usersRepository.update(user.id, {
      mercadoPagoPreapprovalId: data.id,
      subscriptionStatus: data.status,
      subscriptionActive: false,
    });

    return {
      initPoint: data.init_point,
      preapprovalId: data.id,
      status: data.status,
    };
  }

    async handleWebhook(query: any, body: any) {
    const type = body?.type || query?.type || query?.topic;
    const action = body?.action;
    const resourceId =
      body?.data?.id ||
      query?.id ||
      query?.['data.id'] ||
      body?.id;

    console.log('WEBHOOK MP:', {
      type,
      action,
      resourceId,
      query,
      body,
    });

    if (!resourceId) {
      return { received: true };
    }

    if (type === 'payment') {
      await this.handlePaymentWebhook(String(resourceId));
      return { received: true };
    }

    if (
      type === 'subscription_preapproval' ||
      type === 'preapproval'
    ) {
      await this.handlePreapprovalWebhook(String(resourceId));
      return { received: true };
    }

    console.log('Evento ignorado:', type);

    return { received: true };
  }



  private async handlePreapprovalWebhook(preapprovalId: string) {
    const response = await fetch(
      `https://api.mercadopago.com/preapproval/${preapprovalId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      },
    );

    const subscription = await response.json();

    if (!response.ok) {
      console.error('Error consultando preapproval:', subscription);
      return;
    }

    console.log('PREAPPROVAL MP:', subscription);

    const userId = Number(subscription.external_reference);

    if (!userId) {
      console.log('Preapproval sin external_reference');
      return;
    }

    const isActive = subscription.status === 'authorized';

    await this.usersRepository.update(userId, {
      mercadoPagoPreapprovalId: subscription.id,
      subscriptionStatus: subscription.status,
      subscriptionActive: isActive,
      subscriptionStartedAt: isActive ? new Date() : null,
    });
  }



  private async handlePaymentWebhook(paymentId: string) {
    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      },
    );

    const payment = await response.json();

    if (!response.ok) {
      console.error('Error consultando payment:', payment);
      return;
    }

    console.log('PAYMENT MP:', {
      id: payment.id,
      status: payment.status,
      external_reference: payment.external_reference,
      payer_email: payment.payer?.email,
      preapproval_id: payment.metadata?.preapproval_id,
    });

    const userId = Number(payment.external_reference);

    if (!userId) {
      console.log('Payment sin external_reference. No puedo asociarlo a usuario.');
      return;
    }

    const isApproved = payment.status === 'approved';

    if (!isApproved) {
      await this.usersRepository.update(userId, {
        subscriptionStatus: payment.status,
        subscriptionActive: false,
      });

      return;
    }

    await this.usersRepository.update(userId, {
      subscriptionStatus: 'authorized',
      subscriptionActive: true,
      subscriptionStartedAt: new Date(),
    });
  }



  private getPayerEmail(user: User): string {
  const useTestPayer = process.env.MP_USE_TEST_PAYER === 'true';

  const payerEmail = useTestPayer
    ? process.env.MP_TEST_PAYER_EMAIL
    : user.email;

  if (!payerEmail) {
    throw new Error('No se pudo determinar el payer_email');
  }

  return payerEmail;
}
}



