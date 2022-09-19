FROM node:lts

WORKDIR /server

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

ENV NODE_ENV production

EXPOSE 3080

CMD ["yarn", "start"]