import { describe, it, expect, beforeEach, vi } from 'vitest';

const mockSendMail = vi.fn();

vi.mock('nodemailer', () => ({
    default: {
        createTransport: () => ({
            sendMail: mockSendMail
        })
    }
}));

import { sendEmail } from '../../src/services/email-service.js';

beforeEach(() => {
    vi.clearAllMocks();
    // Fijamos FROM por defecto para las pruebas
    process.env.SMTP_FROM = 'from@test.local';
    process.env.SMTP_USER = 'user@test.local';
    process.env.SMTP_PASS = 'pass';
    process.env.SMTP_HOST = 'localhost';
    process.env.SMTP_PORT = '1025';
});

describe('email-service', () => {
    it('envía con from por defecto cuando no se indica', async () => {
        mockSendMail.mockResolvedValueOnce({ messageId: '1' });

        const res = await sendEmail({ to: 'dest@test.local', subject: 's', text: 't' });

        expect(res).toEqual({ messageId: '1' });
        expect(mockSendMail).toHaveBeenCalledWith({
            from: 'from@test.local',
            to: 'dest@test.local',
            subject: 's',
            text: 't',
            html: undefined
        });
    });

    it('lanza error si falta destinatario', async () => {
        await expect(sendEmail({ subject: 's' })).rejects.toThrow('Falta destinatario "to"');
        expect(mockSendMail).not.toHaveBeenCalled();
    });
});
