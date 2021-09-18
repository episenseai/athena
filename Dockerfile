FROM node:16-buster-slim AS node-base

WORKDIR /app


FROM node-base AS node-npm

WORKDIR /build

COPY package.json package-lock.json ./

# hadolint ignore=DL3016
RUN set -x && rm -rf node_modules && npm install


FROM node-npm as node-build

WORKDIR /app

ARG HOST=0.0.0.0
ARG PORT=3000
ARG ENV=production
ARG LOCAL_PROD

RUN --mount=target=.,rw set -x && \
        cp -R /build/node_modules node_modules && \
        if [ ! -z "$LOCAL_PROD" ] && [ "$LOCAL_PROD" -eq 1 ]; then rm .env.production; else rm .env; fi && \
        npm run build && \
        mkdir -p /target && \
        cp -R build /target && \
        cp -R .svelte-kit /target && \
        cp package.json /target && \
        rm -rf node_modules && \
        npm install --production && \
        cp -R node_modules /target/node_modules && ls -Aoh /target


FROM node-base AS athena

COPY --from=node-build /target /app/
COPY package*.json ./

# Always run at default port. Ignore environment
# hades and titan are expected at default ports 3002 and 3001 respectively
ENV PORT=3000
EXPOSE 3000

USER node

# https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md

CMD ["node", "build"]
