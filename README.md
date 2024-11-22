# 2024.1-SENTINELA-BACKEND-FINACEIRO

## Variáveis de ambiente

Copie e cole o conteúdo em "env" para um ".env" antes de rodar o container.

## Comandos de Docker

Para subir o ambiente via Docker e docker-compose utilize os comandos:

```
$ sudo docker-compose up --build
```

Para Remover o ambiente e rodar um banco de novo é preciso apagar o ambiente e deletar os volumes com:

```
$ sudo docker-compose down --volumes
```

```
$ sudo docker-compose rm -f
```

