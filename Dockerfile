FROM node:lts

WORKDIR /server

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

RUN yarn start

ENV NODE_ENV production


EXPOSE 3030

CMD ["yarn", "start"]