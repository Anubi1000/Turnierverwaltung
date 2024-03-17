FROM node:20-alpine as base

FROM base as build
WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . ./
RUN pnpm run build
RUN rm /app/dist/tsconfig.build.tsbuildinfo

FROM base as run
WORKDIR /app

ENV NODE_ENV production
RUN corepack enable

# Install curl for healtheck
RUN apk --no-cache add curl

COPY package.json pnpm-lock.yaml ./
RUN pnpm install -P --frozen-lockfile
COPY --from=build --chown=node:node /app/dist/ /app/dist/

USER node
EXPOSE 8080

CMD ["node", "dist/main.js"]
