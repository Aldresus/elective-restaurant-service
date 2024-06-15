# Base image
FROM node:22.2.0-alpine

# ENV NODE_ENV production # breaks nestjs because CLI is dev only
USER node

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY --chown=node:node package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY --chown=node:node . .

RUN npx prisma generate

# Creates a "dist" folder with the production build
RUN npm run build

# Script to determine the correct path of the main.js file
RUN echo "#!/bin/sh\n\
if [ -f /usr/src/app/dist/main.js ]; then\n\
  exec node /usr/src/app/dist/main.js\n\
elif [ -f /usr/src/app/dist/src/main.js ]; then\n\
  exec node /usr/src/app/dist/src/main.js\n\
else\n\
  echo 'Error: main.js not found'\n\
  exit 1\n\
fi" > /usr/src/app/start.sh \
&& chmod +x /usr/src/app/start.sh

# Start the server using the production build
CMD [ "/usr/src/app/start.sh" ]