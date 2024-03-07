FROM node:21-alpine as base

FROM base as build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . ./
RUN npm run build

FROM base as run
WORKDIR /app

ENV NODE_ENV production

# Install curl for healtheck
RUN apk --no-cache add curl

COPY --from=build --chown=node:node /app/dist/main.js /app/main.js

USER node
EXPOSE 8080

CMD ["node", "main.js"]
