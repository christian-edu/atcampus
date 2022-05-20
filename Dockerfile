#Node-versjon
FROM node:16
#hvor appen legges i containeren
WORKDIR /usr/src/app
#kopiere package og package-lock til workdir
ADD package*.json ./
RUN npm install
COPY . .

WORKDIR /usr/src/app/client
RUN npm install
RUN npm run build

WORKDIR /usr/src/app/server
RUN npm install

# Intern port i containeren
EXPOSE 3000
ARG username
ARG password
ARG host
ARG database
ENV DB_USERNAME=$username
ENV DB_PASSWORD=$password
ENV DB_HOST=$host
ENV DB_DATABASE=$database

# Start express-serveren med "node server.js"
CMD ["npm", "run", "start"]