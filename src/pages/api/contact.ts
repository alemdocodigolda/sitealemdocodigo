import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const nome = data.get('nome')?.toString().trim();
  const empresa = data.get('empresa')?.toString().trim();
  const email = data.get('email')?.toString().trim();
  const servico = data.get('servico')?.toString().trim();
  const mensagem = data.get('mensagem')?.toString().trim();

  if (!nome || !email || !mensagem) {
    return new Response(JSON.stringify({ error: 'Campos obrigatórios em falta.' }), { status: 400 });
  }

  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  await resend.emails.send({
    from: 'Site Além do Código <noreply@alemdocodigo.pt>',
    to: 'geral@alemdocodigo.pt',
    replyTo: email,
    subject: `Novo contacto de ${nome}${empresa ? ` — ${empresa}` : ''}`,
    html: `
      <p><strong>Nome:</strong> ${nome}</p>
      ${empresa ? `<p><strong>Empresa:</strong> ${empresa}</p>` : ''}
      <p><strong>Email:</strong> ${email}</p>
      ${servico ? `<p><strong>Serviço:</strong> ${servico}</p>` : ''}
      <p><strong>Mensagem:</strong><br>${mensagem.replace(/\n/g, '<br>')}</p>
    `,
  });

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
