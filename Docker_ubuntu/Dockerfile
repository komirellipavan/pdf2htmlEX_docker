FROM ubuntu

RUN apt-get update &&\
    apt-get -y install curl 
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash
RUN apt-get install --yes nodejs
RUN rm -rf /var/lib/apt/lists/
RUN npm -v

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .


#RUN apt-get update &&\
    #apt install ./pdf2htmlEX-0.18.8.rc1-master-20200630-Ubuntu-bionic-x86_64.deb

EXPOSE 4000
CMD [ "node", "server.js" ]