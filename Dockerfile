# Build react application 
FROM node:16.19-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json /app/
RUN yarn --silent
COPY . /app
RUN yarn build

# Copy files and launch image
FROM nginx:1.23.3-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
COPY nginx/dhparam.pem /etc/nginx/certs/dhparam.pem
COPY nginx/cert.cer  /etc/nginx/certs/cert.cer
COPY nginx/key.key /etc/nginx/private/key.key
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
