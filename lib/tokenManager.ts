import { randomBytes } from "node:crypto";

let currentSecretToken: string | null = null;
let lastTokenGenerationTime: number = 0;
let tokenUsageState = false; 

export const getTokenUsageState = (): boolean => {
  return tokenUsageState;
};

export const setTokenUsageState = (newState: boolean): void => {
  tokenUsageState = newState;
};

// generate a new random token (32 bytes hex string)
const generateSecretToken = (): string => {
  return randomBytes(32).toString('hex');
};

// check if 30 minutes (1.8e+6 ms) have passed since the last token generation
const isTokenExpired = (): boolean => {
  return Date.now() - lastTokenGenerationTime >= 1.8e+6;
};

// update or generate the secret token if it's expired
export const getSecretToken = (): string => {
  if (isTokenExpired()) {
    setTokenUsageState(false)
    currentSecretToken = generateSecretToken();
    lastTokenGenerationTime = Date.now();
  }
  return currentSecretToken!;
};

