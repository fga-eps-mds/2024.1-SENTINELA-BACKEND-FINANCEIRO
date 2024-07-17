# Imagem base
FROM node:20

# Diretório de trabalho
WORKDIR /app

COPY . .

# Comando para iniciar o servidor
CMD ["sh", "-c", "npm install && npm start"]
