FROM node:latest AS build

WORKDIR /app

COPY . .

RUN npm install && npm run build

FROM nginx:latest AS deploy

WORKDIR /var/www/html

COPY --from=build /app/dist/FacilityToolFrontend .

#FROM node
#WORKDIR /app
#COPY . .
#RUN npm install
#CMD [ "npm", "start" ]
