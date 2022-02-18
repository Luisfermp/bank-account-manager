FROM node:14-slim

WORKDIR /code

COPY package.json yarn.lock ./
RUN make deps