FROM node:20.11.0-alpine
WORKDIR /usr/app/front
EXPOSE 3000
COPY ./ ./ 
RUN npm install --legacy-peer-deps
CMD ["npm", "start"]