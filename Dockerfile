FROM node:16.3-buster-slim AS node-base

WORKDIR /app


FROM node-base AS node-pnpm

WORKDIR /build

COPY package*.json ./

RUN set -x && \
        rm -rf node_modules && \
        npm install -g pnpm@v6.7 && \
        pnpm install && pwd && ls -Aoh


FROM node-pnpm as node-build

WORKDIR /app

RUN --mount=target=.,rw set -x && \
        cp -R /build/node_modules node_modules && \
        pnpm build && \
        mkdir -p /target && \
        cp -R __sapper__ /target && ls -Aoh /target/__sapper__ && \
        rm -rf node_modules && \
        pnpm install --prod && \
        cp -R node_modules /target/node_modules


FROM node-base AS athena

COPY --from=node-build /target /app/

COPY ./static ./static

EXPOSE 3000

USER node

# https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md

CMD ["node", "__sapper__/build"]
