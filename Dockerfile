FROM mhart/alpine-node:12 as builder
WORKDIR /usr/src/app
# COPY package.json ./
# RUN npm install
COPY . ./
# RUN npm run build

FROM nginx:1.17-alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
