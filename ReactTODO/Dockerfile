FROM node:12.18.2 as builder

# install and cache app dependencies
COPY package.json package-lock.json ./
RUN npm install --only=prod&& mkdir /react-frontend && mv ./node_modules ./react-frontend

WORKDIR /react-frontend

COPY . .

RUN npm run build





# ----- PRODUCTION -----

FROM nginx:1.16.0-alpine
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]