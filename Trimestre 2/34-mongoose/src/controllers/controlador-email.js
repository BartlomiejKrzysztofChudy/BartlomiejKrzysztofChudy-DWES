import { sendEmail } from '../services/email-service.js';

export async function enviar(req, res) {
    const { to, subject, text, html } = req.body || {};

    if (!to) {
        return res.status(400).json({ error: 'Falta destinatario "to"' });
    }

    try {
        const info = await sendEmail({ to, subject, text, html });
        return res.status(200).json({ messageId: info.messageId });
    } catch (error) {
        return res.status(500).json({
            error: 'Error enviando email',
            detail: error?.message
        });
    }
}
