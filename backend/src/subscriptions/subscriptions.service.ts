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

    const now = new Date();

    if (
      user.membershipActive &&
      user.membershipEndsAt &&
      user.membershipEndsAt > now
    ) {
      return {
        alreadyActive: true,
        message: 'El usuario ya tiene una membresía activa',
      };
    }

    const body = {
      items: [
        {
          title: 'Mensualidad Locos x Ferro',
          description: 'Acceso mensual a beneficios exclusivos de socios',
          quantity: 1,
          currency_id: 'ARS',
          unit_price: 1000,
        },
      ],

      external_reference: String(user.id),

      back_urls: {
        success: `${process.env.FRONTEND_LOCAL_URL}/suscripcion/exito`,
        failure: `${process.env.FRONTEND_LOCAL_URL}/suscripcion/error`,
        pending: `${process.env.FRONTEND_LOCAL_URL}/suscripcion/pendiente`,
      },

      notification_url: `${process.env.BACKEND_PUBLIC_URL}/subscriptions/webhook`,

      auto_return: 'approved',
    };

    console.log('MP_ACCESS_TOKEN existe:', !!process.env.MP_ACCESS_TOKEN);
    console.log(
      'MP_ACCESS_TOKEN empieza con:',
      process.env.MP_ACCESS_TOKEN?.slice(0, 12),
    );

    console.log('BODY CHECKOUT PRO ENVIADO A MP:', body);

    const response = await fetch(
      'https://api.mercadopago.com/checkout/preferences',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );

    const data = await response.json();

    console.log('RESPUESTA CHECKOUT PRO:', data);

    if (!response.ok) {
      console.error('ERROR CREANDO PREFERENCE:', data);
      throw new Error('Error creando pago en Mercado Pago');
    }

    await this.usersRepository.update(user.id, {
      membershipStatus: 'pending',
      mercadoPagoLastPreferenceId: data.id,
      mercadoPagoPaymentStatus: 'pending',
    });

    return {
      initPoint: data.init_point,
      preferenceId: data.id,
      status: 'pending',
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

      console.log('Evento ignorado:', type);

      return { received: true };
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
      preference_id: payment.preference_id,
      date_approved: payment.date_approved,
    });

    const userId = Number(payment.external_reference);

    if (!userId) {
      console.log('Payment sin external_reference. No puedo asociarlo a usuario.');
      return;
    }

    const isApproved = payment.status === 'approved';

    if (!isApproved) {
      await this.usersRepository.update(userId, {
        membershipStatus: payment.status,
        membershipActive: false,
        mercadoPagoLastPaymentId: String(payment.id),
        mercadoPagoPayerEmail: payment.payer?.email ?? null,
        mercadoPagoPaymentStatus: payment.status,
        mercadoPagoLastPaymentDate: payment.date_created
          ? new Date(payment.date_created)
          : new Date(),
      });

      return;
    }

    const startedAt = payment.date_approved
      ? new Date(payment.date_approved)
      : new Date();

    const endsAt = new Date(startedAt);
    endsAt.setDate(endsAt.getDate() + 30);

    await this.usersRepository.update(userId, {
      membershipActive: true,
      membershipStatus: 'active',
      membershipStartedAt: startedAt,
      membershipEndsAt: endsAt,

      mercadoPagoLastPaymentId: String(payment.id),
      mercadoPagoLastPreferenceId: payment.preference_id ?? null,
      mercadoPagoPayerEmail: payment.payer?.email ?? null,
      mercadoPagoPaymentStatus: payment.status,
      mercadoPagoLastPaymentDate: startedAt,
    });
  }



  private getPayerEmail(user: User): string {
    const useTestPayer = process.env.MP_USE_TEST_PAYER === 'true';

    const payerEmail = useTestPayer
      ? process.env.MP_TEST_PAYER_EMAIL?.trim().toLowerCase()
      : user.email?.trim().toLowerCase();

    console.log('MP_USE_TEST_PAYER:', process.env.MP_USE_TEST_PAYER);
    console.log('EMAIL USUARIO:', user.email);
    console.log('PAYER EMAIL FINAL:', payerEmail);

    if (!payerEmail) {
      throw new Error('No se pudo determinar el payer_email');
    }

    return payerEmail;
  }
}



