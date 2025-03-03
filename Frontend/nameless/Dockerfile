FROM node:20-alpine AS builder

RUN npm install -g pnpm

WORKDIR /usr/app/front

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .  

RUN pnpm run build

FROM node:20-alpine

WORKDIR /usr/app/front

RUN npm install -g serve

COPY --from=builder /usr/app/front/build ./build

EXPOSE 3000

CMD ["serve", "-s", "build"]
