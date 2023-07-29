declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH_SECRET: string;
      TOKEN_NAME: string;
      AUTH_KEY: string;
      KV_URL: string;
      REDIS_PORT: string;
      REDIS_HOST: string;
      REDIS_USER: string;
      REDIS_PASSWORD: string;
    }
  }
}

export {};