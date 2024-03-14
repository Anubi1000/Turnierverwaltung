FROM node:20-alpine as base

FROM base as build
WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . ./
RUN pnpm run build

FROM base as run
WORKDIR /app

ENV NODE_ENV production

# Install curl for healtheck
RUN apk --no-cache add curl

COPY --from=build --chown=node:node /app/dist/main.js /app/main.js

USER node
EXPOSE 8080

CMD ["node", "main.js"]
