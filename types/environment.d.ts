declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH_SECRET: string;
      TOKEN_NAME: string;
      AUTH_KEY: string;
      REDIS_URL: string;
      KV_URL: string;
      KV_TOKEN: string;
    }
  }
}

export {};