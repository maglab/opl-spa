FROM node as build

ARG BUILD_VERSION
ARG AUTH0_DOMAIN
ARG AUTH0_CLIENT_ID
ARG AUTH0_CLIENT_SECRET

ENV VITE_BUILD_VERSION=${BUILD_VERSION}
ENV VITE_AUTH0_DOMAIN=${AUTH0_DOMAIN}
ENV VITE_AUTH0_CLIENT_ID=${AUTH0_CLIENT_ID}
ENV VITE_AUTH0_CLIENT_SECRET=${AUTH0_CLIENT_SECRET}

WORKDIR /app
COPY . .

RUN npm install
RUN npm install --global serve
RUN npm run build

