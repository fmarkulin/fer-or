FROM node:20
LABEL maintainer="Fran Markulin"
LABEL version="1.0"
COPY package*.json ./
RUN npm install
COPY export*.ts ./
RUN npx tsc exportJson.ts
RUN npx tsc exportCsv.ts
ENTRYPOINT ["bash"]