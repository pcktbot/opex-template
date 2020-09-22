FROM node:12

# ARG NPM_TOKEN
# ENV BROWSER_URL=

RUN mkdir -p /usr/src/opex
WORKDIR /usr/src/opex

COPY . /usr/src/opex
RUN npm install
RUN npm run build

ENV PORT=8080
ENV HOST=0.0.0.0

EXPOSE ${PORT}

CMD [ "npm", "start" ]
