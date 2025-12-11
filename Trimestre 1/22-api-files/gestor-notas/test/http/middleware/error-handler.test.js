import { describe, it, expect, vi } from 'vitest';
import { errorHandler } from '../../../src/http/middleware/error-handler.js';
import { logger } from '../../../src/utils/logger.js';

vi.mock('../../../src/utils/logger.js', () => ({
  logger: {
    error: vi.fn(),
  },
}));

describe('Error Handler Middleware', () => {
  it('handles error with message', () => {
    const err = new Error('Test error');
    const req = {};
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    const next = vi.fn();

    errorHandler(err, req, res, next);

    expect(logger.error).toHaveBeenCalledWith('Test error');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Test error' });
  });

  it('handles error without message (string error)', () => {
    const err = 'String error';
    const req = {};
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    const next = vi.fn();

    errorHandler(err, req, res, next);

    expect(logger.error).toHaveBeenCalledWith('String error');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});
