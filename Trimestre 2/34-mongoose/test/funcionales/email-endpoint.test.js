import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest';
import request from 'supertest';

const mockSendEmail = vi.fn();

vi.mock('../../src/services/email-service.js', async () => {
    const actual = await vi.importActual('../../src/services/email-service.js');
    return {
        ...actual,
        sendEmail: (...args) => mockSendEmail(...args)
    };
});

let app;

beforeAll(async () => {
    ({ app } = await import('../../src/app.js'));
});

beforeEach(() => {
    vi.clearAllMocks();
});

describe('POST /api/email/send', () => {
    it('envía email y responde con messageId', async () => {
        mockSendEmail.mockResolvedValueOnce({ messageId: 'abc123' });

        const res = await request(app)
            .post('/api/email/send')
            .send({ to: 'dest@test.local', subject: 'Hola', text: 'Mensaje' })
            .set('Content-Type', 'application/json');

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ messageId: 'abc123' });
        expect(mockSendEmail).toHaveBeenCalledWith({
            to: 'dest@test.local',
            subject: 'Hola',
            text: 'Mensaje'
        });
    });

    it('devuelve 400 si falta destinatario', async () => {
        const res = await request(app)
            .post('/api/email/send')
            .send({ subject: 'Hola' })
            .set('Content-Type', 'application/json');

        expect(res.status).toBe(400);
        expect(mockSendEmail).not.toHaveBeenCalled();
    });

    it('propaga error interno como 500', async () => {
        mockSendEmail.mockRejectedValueOnce(new Error('Fallo SMTP'));

        const res = await request(app)
            .post('/api/email/send')
            .send({ to: 'dest@test.local', subject: 'Hola', text: 'Mensaje' })
            .set('Content-Type', 'application/json');

        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty('error', 'Error enviando email');
        expect(res.body.detail).toBe('Fallo SMTP');
    });
});
