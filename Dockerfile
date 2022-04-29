# what type of env / what existing docker image to choose
FROM node:latest
# the directory we are working from basically a way to cd into a directory
WORKDIR /SDC-QA
# copy package file into the directory
COPY package*.json ./
# install deps
RUN npm install
# copy source code (will ignore node_modules thanks to .dockerignore)
COPY . .
RUN ["apt-get", "-y", "update"]
RUN ["apt-get", "install", "-y", "vim"]

# Set env variables
ENV PORT=3030
# make port available outside docker container
EXPOSE 3030
# command to start application
CMD ["npm","start"]