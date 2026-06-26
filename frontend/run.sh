#!/bin/bash

# Colores para mejor visualización
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}🚀 Iniciando proyecto React con Vite${NC}"
echo -e "${BLUE}========================================${NC}"

# Puerto a limpiar
PORT=5173

# 1. Detener procesos de Node que usen el puerto
echo -e "${YELLOW}🔍 Buscando procesos en el puerto $PORT...${NC}"
PID=$(lsof -ti :$PORT 2>/dev/null)

if [ -n "$PID" ]; then
    echo -e "${YELLOW}⚠️  Proceso encontrado (PID: $PID). Deteniendo...${NC}"
    kill -9 $PID 2>/dev/null
    sleep 1
    echo -e "${GREEN}✅ Proceso detenido${NC}"
else
    echo -e "${GREEN}✅ No hay procesos en el puerto $PORT${NC}"
fi

# 2. Verificar que el puerto esté libre
sleep 1
if lsof -i :$PORT > /dev/null 2>&1; then
    echo -e "${RED}❌ El puerto $PORT sigue ocupado. Intentando con sudo...${NC}"
    sudo kill -9 $(sudo lsof -ti :$PORT) 2>/dev/null
    sleep 1
fi

# 3. Mostrar estado final del puerto
if lsof -i :$PORT > /dev/null 2>&1; then
    echo -e "${RED}❌ No se pudo liberar el puerto $PORT. Revisa manualmente.${NC}"
    exit 1
else
    echo -e "${GREEN}✅ Puerto $PORT liberado correctamente${NC}"
fi

# 4. Instalar dependencias si faltan
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Instalando dependencias...${NC}"
    npm install
fi

# 5. Levantar el proyecto
echo -e "${GREEN}▶️  Levantando servidor de desarrollo...${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}🌐 Servidor disponible en: http://localhost:$PORT${NC}"
echo -e "${YELLOW}⌨️  Presiona Ctrl+C para detener${NC}"
echo -e "${BLUE}========================================${NC}"

# Ejecutar npm run dev
npm run dev