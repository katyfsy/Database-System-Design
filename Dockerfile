FROM node:latest

# Create app directory
WORKDIR /SDC-QA

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY package*.json ./
COPY . .

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Defind what port app binds to
EXPOSE 3030

CMD [ "npm", "start" ]