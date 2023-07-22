declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH_SECRET: string;
      TOKEN_NAME: string;
      AUTH_KEY: string;
    }
  }
}

export {};