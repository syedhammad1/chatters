FROM node:15
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]
COPY ./src ./src
RUN npm install
CMD ["npm","run","dev"]