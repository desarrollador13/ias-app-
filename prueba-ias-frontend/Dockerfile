
FROM node:12.11.1
# set working directory
WORKDIR /app-web-prueba
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install and cache app dependencies
COPY package.json /app-web-prueba/package.json
RUN npm install
RUN npm install -g @angular/cli@8
RUN ng update @angular/cli --force
#RUN ng update @angular/cli --force

# RUN ng update @angular/cli
# RUN ng update --all --force


#RUN npm install -g @angular/cli@8
# add app
COPY . /app-web-prueba
# start app
CMD ng serve --host 0.0.0.0