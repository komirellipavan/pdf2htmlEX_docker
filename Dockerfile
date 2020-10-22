FROM mhart/alpine-node:12

# Create app directory
WORKDIR /usr/src/app

#RUN echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories

RUN apk add --no-cache \
    build-base cairo-dev cairo cairo-tools \
    # pillow dependencies
    jpeg-dev freetype-dev openjpeg-dev 

# RUN apk add --no-cache \
#     libstdc++        \
#     libgcc           \
#     gnu-libiconv --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community     \
#     gettext          \
#     glib             \
#     freetype         \
#     fontconfig       \
#     cairo            \
#     libpng           \
#     libjpeg-turbo    \
#     libxml2 \
#     && rm -rf /var/lib/apt/lists/* 

COPY pdf2htmlEX /usr/local/share/pdf2htmlEX

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

#RUN npm install
# If you are building your code for production
RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 4000

ENTRYPOINT [ "node", "server.js" ]
