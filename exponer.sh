#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

if [ $# -eq 0 ]; then
    echo -e "${RED}Uso: $0 PUERTO1 PUERTO2 [PUERTO3 ...]${NC}"
    echo "Ejemplo: $0 5173 3000 8080"
    exit 1
fi

echo -e "${GREEN}▶ Exponiendo puertos con cloudflared: $@${NC}"

# Detener procesos previos de cloudflared
pkill -f cloudflared 2>/dev/null
sleep 1

echo -e "\n${GREEN}📋 URLs de tus servicios:${NC}"

for PORT in "$@"; do
    echo -e "${GREEN}▶ Iniciando túnel para puerto $PORT${NC}"

    LOG_FILE="/tmp/cloudflared-$PORT.log"

    cloudflared tunnel --url "http://localhost:$PORT" > "$LOG_FILE" 2>&1 &

    sleep 4

    URL=$(grep -o 'https://[-a-zA-Z0-9.]*\.trycloudflare\.com' "$LOG_FILE" | head -n 1)

    if [ -n "$URL" ]; then
        echo -e "🔹 Puerto $PORT → $URL"
    else
        echo -e "${RED}No se pudo obtener URL para puerto $PORT. Revisá:${NC} $LOG_FILE"
    fi
done

echo -e "\n${GREEN}▶ Para detener todos los túneles: pkill -f cloudflared${NC}"
echo -e "${GREEN}▶ Logs: /tmp/cloudflared-PUERTO.log${NC}"