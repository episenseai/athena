FROM node:16.3-buster-slim AS node-base

WORKDIR /app


FROM node-base AS node-build

COPY package*.json ./

RUN --mount=target=.,rw \
        set -x && \
        rm -rf node_modules && \
        npm install -g pnpm@v6.7 && \
        pnpm install && \
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

CMD ["node", "__sapper__/build"]
