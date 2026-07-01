#!/bin/bash

PORT=3000

echo "Buscando procesos en el puerto $PORT..."

PID=$(lsof -ti tcp:$PORT)

if [ -n "$PID" ]; then
  echo "Matando proceso(s) en puerto $PORT: $PID"
  kill -9 $PID
else
  echo "No hay procesos usando el puerto $PORT"
fi

echo "Levantando backend..."
npm run start:dev