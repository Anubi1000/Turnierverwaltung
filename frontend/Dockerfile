FROM node:20-alpine as base

FROM base as build
WORKDIR /app

# Disable telemetry
ENV NEXT_TELEMETRY_DISABLED 1

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . ./
RUN pnpm run build

FROM base as run
WORKDIR /app

# Disable telemetry and set env to production
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

#COPY --from=build --chown=node:node /app/public ./public

RUN mkdir .next
RUN chown node:node .next

COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static

USER node
EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
