FROM node:lts

WORKDIR /server

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

RUN yarn build
COPY . .

ENV NODE_ENV production

EXPOSE 3080

CMD ["yarn", "start"]