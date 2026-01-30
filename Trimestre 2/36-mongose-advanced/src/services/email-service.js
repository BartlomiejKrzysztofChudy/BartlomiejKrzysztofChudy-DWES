import nodemailer from 'nodemailer';

function buildTransportConfig(env = process.env) {
    const host = env.SMTP_HOST || '127.0.0.1';
    const port = Number(env.SMTP_PORT ?? 1025);
    const secure = env.SMTP_SECURE === 'true';
    const user = env.SMTP_USER;
    const pass = env.SMTP_PASS;

    const auth = user && pass ? { user, pass } : undefined;

    return {
        host,
        port,
        secure,
        auth
    };
}

let defaultTransport;

export function getTransport() {
    if (defaultTransport) return defaultTransport;
    defaultTransport = nodemailer.createTransport(buildTransportConfig());
    return defaultTransport;
}

function getDefaultFrom(env = process.env) {
    return env.SMTP_FROM || env.SMTP_USER || 'no-reply@example.test';
}

export async function sendEmail({ to, subject, text, html, from }, options = {}) {
    if (!to) {
        throw new Error('Falta destinatario "to"');
    }

    const transport = options.transport || getTransport();
    const fromAddress = from || getDefaultFrom();

    return transport.sendMail({
        from: fromAddress,
        to,
        subject,
        text,
        html
    });
}
