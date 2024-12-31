# Usar una imagen base ligera de Node.js
FROM node:20-alpine

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos necesarios para instalar dependencias
COPY package.json package-lock.json ./

# Instalar las dependencias
RUN npm install

# Copiar todos los archivos del proyecto al contenedor
COPY . .

# Exponer los puertos necesarios
EXPOSE 8080
EXPOSE 3000

# Iniciar la aplicación
CMD ["sh", "-c", "node src/tests/functional_tests_routes.test.js && node src/tests/mocks.test.js && node index.js"]
