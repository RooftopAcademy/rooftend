import { HexBase64BinaryEncoding, Utf8AsciiBinaryEncoding } from "crypto";

export const CryptoSecurityKey = {
  algorithm: 'aes-256-cbc',
  key: Buffer.alloc(32).fill('jaksfn jafkn jafnsafskajlwqjr'),
  initialVector: Buffer.alloc(16).fill('jaksfn jafkn jafnsafskajlwqjr'),
  inputEncoding: 'utf8' as Utf8AsciiBinaryEncoding,
  outputEncoding: 'hex' as HexBase64BinaryEncoding,
};