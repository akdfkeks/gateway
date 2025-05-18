FROM node:18-alpine AS builder

ARG APP_NAME
WORKDIR /app

COPY . .
RUN yarn install --frozen-lockfile
RUN yarn build:$APP_NAME

# Runtime stage with Node.js 18
FROM node:18-alpine AS runner

ARG APP_NAME
ENV APP_NAME=${APP_NAME}

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./

RUN yarn install --production

CMD sh -c "node dist/apps/${APP_NAME}/src/main.js"
