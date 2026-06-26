#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

if [ $# -eq 0 ]; then
    echo -e "${RED}Uso: $0 PUERTO1 PUERTO2 [PUERTO3 ...]${NC}"
    echo "Ejemplo: $0 5173 3000 8080"
    exit 1
fi

echo -e "${GREEN}▶ Exponiendo puertos: $@${NC}"

# Detener procesos previos
pkill -f ngrok 2>/dev/null
sleep 1

# Iniciar un túnel por cada puerto con URLs diferentes
for PORT in "$@"; do
    echo -e "${GREEN}▶ Iniciando túnel para puerto $PORT${NC}"
    # La clave está en NO usar --pooling-enabled ni hostnames fijos
    ngrok http $PORT > /dev/null 2>&1 &
    sleep 2  # Esperar más tiempo para que cada túnel obtenga URL única
done

echo -e "${GREEN}✅ Túneles iniciados. Obteniendo URLs...${NC}"
sleep 3

# Mostrar TODAS las URLs correctamente
echo -e "\n${GREEN}📋 URLs de tus servicios:${NC}"
curl -s http://localhost:4040/api/tunnels | jq -r '.tunnels[] | "🔹 Puerto \(.config.addr) → \(.public_url)"' 2>/dev/null || \
    echo -e "${RED}No se pudo obtener las URLs. Visita http://localhost:4040 para verlas.${NC}"

echo -e "\n${GREEN}▶ Para detener todos los túneles: pkill -f ngrok${NC}"
echo -e "${GREEN}▶ Para ver el estado: curl -s http://localhost:4040/api/tunnels | jq${NC}"