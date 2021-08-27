FROM node:lts-alpine AS build

WORKDIR /app

COPY . /app

RUN npm install && npm run build



FROM node:lts-alpine

WORKDIR /app

COPY . /app

COPY --from=build /app/.nuxt ./.nuxt
COPY --from=build /app/static/sw.js ./app/static/sw.js

ENV NODE_ENV=production

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
