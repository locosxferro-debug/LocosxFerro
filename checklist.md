# Errores comunes al correr localmente con túneles, Google Login y MercadoPago

## 1. Mezclar `localhost` con la URL del túnel

Si iniciás sesión desde:

```txt
http://localhost:5173
```

pero MercadoPago te devuelve a:

```txt
https://url-del-front.trycloudflare.com/suscripcion/exito
```

la sesión se pierde.

Esto pasa porque `localStorage` no se comparte entre dominios.

### Solución

Hacer todo el flujo desde la misma URL del frontend:

```txt
https://url-del-front.trycloudflare.com
```

No iniciar sesión desde `localhost` si después MercadoPago vuelve al túnel.

---

## 2. Cambia la URL del túnel al volver a levantar `cloudflared`

Cada vez que se levanta un túnel nuevo con:

```bash
cloudflared tunnel --url http://localhost:5173
```

o:

```bash
cloudflared tunnel --url http://localhost:3000
```

Cloudflare genera una URL nueva.

Ejemplo:

```txt
https://passes-beverly-broadcast-holes.trycloudflare.com
```

Si cambia esa URL, hay que actualizar todas las configuraciones que dependan de ella.

---

## 3. Actualizar `.env` del frontend

En el frontend, `VITE_API_URL` debe apuntar al backend público.

```env
VITE_API_URL=https://url-del-backend.trycloudflare.com
```

Después de cambiarlo, reiniciar Vite:

```bash
npm run dev
```

---

## 4. Actualizar `.env` del backend

En el backend, la URL del frontend debe ser la URL pública del túnel del frontend:

```env
FRONTEND_LOCAL_URL=https://url-del-front.trycloudflare.com
```

Esto se usa para que MercadoPago vuelva correctamente a:

```txt
https://url-del-front.trycloudflare.com/suscripcion/exito
```

Después de cambiarlo, reiniciar el backend.

---

## 5. Actualizar el webhook de MercadoPago

Cuando se vuelven a levantar los túneles, también hay que actualizar el webhook en MercadoPago.

El webhook debe apuntar al backend, no al frontend.

```txt
https://url-del-backend.trycloudflare.com/mercadopago/webhook
```

Si el túnel del backend cambia, el webhook anterior deja de servir.

---

## 6. Error de CORS

Error típico:

```txt
Access to fetch at 'https://url-del-backend.trycloudflare.com/auth/google'
from origin 'https://url-del-front.trycloudflare.com'
has been blocked by CORS policy
```

### Causa

El backend no está permitiendo la URL actual del frontend.

### Solución

En `main.ts` del backend:

```ts
app.enableCors({
  origin: [
    'http://localhost:5173',
    'https://url-del-front.trycloudflare.com',
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});
```

Importante: no dejar espacios antes del `https`.

Incorrecto:

```ts
' https://url-del-front.trycloudflare.com'
```

Correcto:

```ts
'https://url-del-front.trycloudflare.com'
```

Después reiniciar el backend.

---

## 7. Google Login muestra el dominio del túnel

Puede aparecer algo como:

```txt
Selecciona una cuenta
Ir a passes-beverly-broadcast-holes.trycloudflare.com
```

Esto es normal mientras se use `trycloudflare.com`.

Google muestra el dominio real desde donde se está ejecutando la app.

Para que aparezca el nombre real del proyecto, habría que usar un dominio propio y configurarlo en Google Cloud Console.

---

## 8. Configurar Google Cloud Console

Si cambia la URL del frontend, hay que agregarla en Google Cloud Console como origen autorizado.

Ejemplo:

```txt
https://url-del-front.trycloudflare.com
```

No agregar rutas como:

```txt
/suscripcion/exito
```

Solo va el dominio.

---

## 9. Vite bloquea el túnel por `allowedHosts`

Si Vite muestra error de host no permitido, agregar la URL del túnel del frontend en `vite.config.js`.

```js
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: [
      'url-del-front.trycloudflare.com',
    ],
  },
});
```

Va sin `https://`.

Después reiniciar Vite.

---

## 10. Backend y frontend deben usar túneles distintos

Ejemplo:

Frontend:

```bash
cloudflared tunnel --url http://localhost:5173
```

Backend:

```bash
cloudflared tunnel --url http://localhost:3000
```

Entonces:

```env
VITE_API_URL=https://url-del-backend.trycloudflare.com
FRONTEND_LOCAL_URL=https://url-del-front.trycloudflare.com
```

Y en MercadoPago:

```txt
https://url-del-backend.trycloudflare.com/mercadopago/webhook
```

---

## 11. Sesión perdida después de pagar

Si al volver de MercadoPago el usuario aparece deslogueado, revisar:

```js
localStorage.getItem('accessToken')
localStorage.getItem('user')
```

Si devuelve `null`, probablemente se inició sesión desde otro dominio.

### Solución

No iniciar sesión desde `localhost` y después pagar usando el túnel.

Usar siempre la URL pública del frontend.

---

## 12. Checklist cada vez que se levantan túneles nuevos

Cada vez que se reinician los túneles, revisar:

* Nueva URL del frontend.
* Nueva URL del backend.
* `.env` del frontend:

  ```env
  VITE_API_URL=https://url-del-backend.trycloudflare.com
  ```
* `.env` del backend:

  ```env
  FRONTEND_LOCAL_URL=https://url-del-front.trycloudflare.com
  ```
* CORS del backend:

  ```ts
  'https://url-del-front.trycloudflare.com'
  ```
* `allowedHosts` de Vite:

  ```js
  'url-del-front.trycloudflare.com'
  ```
* Google Cloud Console:

  ```txt
  https://url-del-front.trycloudflare.com
  ```
* Webhook de MercadoPago:

  ```txt
  https://url-del-backend.trycloudflare.com/mercadopago/webhook
  ```

Después de cambiar variables de entorno o configuración:

```bash
npm run dev
```

en frontend, y reiniciar el backend.
