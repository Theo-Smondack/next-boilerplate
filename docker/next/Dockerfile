FROM node:20-alpine

WORKDIR /home/node/app

RUN apk add --no-cache openssl openssl-dev

USER node

ENTRYPOINT [ "./scripts/next.sh" ]