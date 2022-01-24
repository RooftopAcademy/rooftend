import { HexBase64BinaryEncoding, Utf8AsciiBinaryEncoding } from "crypto";

export const cryptoConstants = {
  ALGORITHM: 'aes-256-cbc',
  KEY: Buffer.alloc(32).fill('jaksfn jafkn jafnsafskajlwqjr'),
  INITIAL_VECTOR: Buffer.alloc(16).fill('jaksfn jafkn jafnsafskajlwqjr'),
  INPUT_ENCODING: 'utf8' as Utf8AsciiBinaryEncoding,
  OUTPUT_ENCODING: 'hex' as HexBase64BinaryEncoding,
  VALIDITY_TIME: 1000 * 60 * 60 * 24,
};
