export default {
  async fetch(request, env) {

    // Preflight CORS — przeglądarka wysyła OPTIONS przed właściwym POST
    if (request.method === 'OPTIONS') {
      return corsResponse(null, 204);
    }

    if (request.method !== 'POST') {
      return corsResponse('Method not allowed', 405);
    }

    const body = await request.json().catch(() => null);
    if (!body) return corsResponse({ error: 'Invalid request' }, 400);

    const { name, email, message, website } = body;

    // Honeypot — pole ukryte przed użytkownikiem, widoczne dla botów.
    // Jeśli wypełnione, udajemy sukces i nic nie robimy.
    if (website) {
      return corsResponse({ ok: true }, 200);
    }

    // Walidacja pól — ta sama logika co na frontendzie (obrona w głąb)
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return corsResponse({ error: 'FIELDS_REQUIRED' }, 400);
    }
    if (name.trim().length < 2 || name.length > 100) {
      return corsResponse({ error: 'NAME_INVALID' }, 400);
    }
    if (!email.includes('@') || !email.includes('.') || email.length > 254) {
      return corsResponse({ error: 'EMAIL_INVALID' }, 400);
    }
    if (message.trim().length < 10 || message.length > 2000) {
      return corsResponse({ error: 'MESSAGE_INVALID' }, 400);
    }

    // Wysyłka przez Resend API
    // Klucz RESEND_API_KEY pochodzi z Cloudflare Secrets — nigdy nie trafia do przeglądarki
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Desbytes Portfolio <contact@desbytes.com>',
        to:   'desbytes.dev@gmail.com',
        // reply_to pozwala odpowiedzieć bezpośrednio do nadawcy z poziomu Gmail
        reply_to: email,
        subject: `Wiadomość od ${name}`,
        text: `Od: ${name} <${email}>\n\n${message}`,
      }),
    });

    if (!res.ok) {
      return corsResponse({ error: 'Błąd wysyłki. Spróbuj ponownie.' }, 500);
    }

    return corsResponse({ ok: true }, 200);
  }
};

function corsResponse(body, status) {
  return new Response(
    body ? JSON.stringify(body) : null,
    {
      status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://desbytes.com',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}
