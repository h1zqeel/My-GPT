## My-GPT
### To access the Application
https://my-gpt.is-an.app
### Description of the Application:
- A Simple ChatGPT Client
- Create a GPT BOT with your own System Message that can use one of the following models:
 	- `gpt-3.5-turbo`
	- `gpt-3.5-turbo-16k`
	- `gpt-4`
	- `gpt-4-32k`
- To be able to create GPT-4 Chats you need to add a API Key that has Permission to use GPT-4 Models
- Generate your Open AI API Keys [here](https://platform.openai.com/account/api-keys)

### Local Setup

#### Set the following data in .env
```
DATABASE_URL (Postgres DB URL)
TOKEN_NAME (string)
AUTH_SECRET (32 Chars)
AUTH_KEY (43 Chars)
REDIS_URL (Redis URL)
```
#### Install Dependencies
```
yarn
```
#### Prisma Setup + Migrations
```
    npx prisma generate
```
```
    npx prisma migrate deploy
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
