const API_URL = import.meta.env.VITE_API_URL;

export async function createSubscription(userId) {
  const response = await fetch(`${API_URL}/subscriptions/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || 'No se pudo crear la mensualidad');
  }

  return data;
}

export async function redirectToSubscriptionCheckout(user) {
  if (!user) {
    throw new Error('Tenés que iniciar sesión para suscribirte');
  }

  if (!user.id) {
    throw new Error('No se encontró el id del usuario');
  }

  const data = await createSubscription(user.id);

  if (data.alreadyActive) {
    return data;
  }

  if (data.initPoint) {
    window.location.href = data.initPoint;
    return data;
  }

  throw new Error('Mercado Pago no devolvió initPoint');
}