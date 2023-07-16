declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH_SECRET: string;
      TOKEN_NAME: string;
    }
  }
}

export {};