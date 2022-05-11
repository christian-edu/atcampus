#Node-versjon
FROM node:16
#hvor appen legges i containeren
WORKDIR /usr/src/app
#kopiere package og package-lock til workdir
ADD package*.json ./
#RUN npm install

# For prod.miljø
RUN npm ci --only=production

# Kopiere kildekoden
COPY . .

# Intern port i containeren
EXPOSE 3000

# Start express-serveren med "node server.js"
CMD [ "node", "server.js" ]

