FROM node:12 AS frontend
WORKDIR /usr/src/app
COPY client/ ./client/
RUN cd client && npm install && npm run build

FROM node:12 AS backend
WORKDIR /root/
COPY --from=frontend /usr/src/app/client/dist ./client/dist
COPY server/ ./server/
RUN cd server && npm install

EXPOSE 8080

CMD ["node", "./server/server.js"]