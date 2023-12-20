## My-GPT
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![ChatGPT](https://img.shields.io/badge/chatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

### Wanna Help me Improve This Project ?
email me at: hizqeeljaved2013@gmail.com

### To access the Application
https://my-gpt.is-an.app
### Description of the Application:
- A Simple LLM Client (For OpenAI & Google based LLM)
- Create a LLM BOT with your own System Message that can use one of the following models:
 	- `GPT 3.5 Turbo`
	- `GPT 3.5 Turbo 16k`
	- `GPT 4`
	- `GPT 4 32k`
	- `Google PaLM 2`
	- `Google Gemini Pro`
- To be able to create GPT-4 Chats you need to add a API Key that has Permission to use GPT-4 Models
- To access Google LLMs you need to add Google AI API Key
- Generate your API Keys
  - Open AI API Key [here](https://platform.openai.com/account/api-keys)
  - Google AI API Key [here](https://makersuite.google.com/app/apikey)

### Local Setup

#### Set the following data in .env
```
DATABASE_URL (Neon Postgres DB URL)
TOKEN_NAME (string)
AUTH_SECRET (32 Chars)
AUTH_KEY (43 Chars)
KV_URL (Redis Store URL)
KV_TOKEN (Redis Store Token)
GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
```
#### Install Dependencies
```
yarn
```
#### Drizzle Setup + Migrations
```
    yarn generate
```
```
    yarn migrate
```
#### Start the Dev Server
```
yarn dev
```

#### Build + Run Build
```
yarn build
```
```
yarn start
```
