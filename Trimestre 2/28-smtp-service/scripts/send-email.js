import 'dotenv/config';
import { sendEmail } from '../src/services/email-service.js';

async function main() {
    const to = process.argv[2] || process.env.EMAIL_TO;
    const subject = process.argv[3] || process.env.EMAIL_SUBJECT || 'Prueba SMTP';
    const text = process.argv[4] || process.env.EMAIL_TEXT || 'Hola desde Nodemailer';
    const html = process.env.EMAIL_HTML; 

    if (!to) {
        console.error('Uso: npm run send-email -- <destinatario> [asunto] [texto]');
        process.exit(1);
    }

    const info = await sendEmail({ to, subject, text, html });
    console.log('Enviado:', info.messageId);
}

main().catch((err) => {
    console.error('Error enviando email:', err.message);
    process.exit(1);
});
