/// <reference types="jest" />

// Mock environment variables
process.env.DATABASE_URL = 'postgres://test:test@localhost:5432/test';

// Clear all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

// Mock console methods to reduce noise in tests
const mockConsole = {
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
};

// @ts-ignore - we're intentionally overriding console
console = { ...console, ...mockConsole };
