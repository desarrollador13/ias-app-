FROM node:12.11.1
# FROM postgres:9.6

# ENV POSTGRES_USER postgres
# ENV POSTGRES_PASSWORD admin
# ENV POSTGRES_DB prueba
#- ./init.sql:/docker-entrypoint-initdb.d/1-init.sql
# ADD create_db.sql /docker-entrypoint-initdb.d/
# ADD create_table.sql /docker-entrypoint-initdb.d/
# ADD insert_table.sql /docker-entrypoint-initdb.d/
COPY . ./api-rest-v1-prueba
WORKDIR /api-rest-v1-prueba

#
#WORKDIR /app
#COPY	package*.json ./
COPY	package*.json ./
COPY	tsconfig.json ./
RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm install
EXPOSE 3000
#COPY . .
CMD ["npm","run", "dev"]
#EXPOSE 5432