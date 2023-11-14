FROM node as build
ARG BUILD_VERSION
ENV VITE_BUILD_VERSION ${BUILD_VERSION}
WORKDIR /app
COPY . .

RUN npm install
RUN npm install --global serve
RUN npm run build

