import crypto from 'crypto';

if (!globalThis.crypto) {
  // @ts-ignore
  globalThis.crypto = crypto;
}