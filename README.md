
# Comisión 70105 - Programación Backend III: Primera Entrega

## **Características del Proyecto**
- **Endpoints:** API funcional para usuarios y mascotas con soporte para mocking y generación de datos.
- **Pruebas:** Automatizadas utilizando Node.js nativo con `assert`.
- **Docker:** Imágenes listas para despliegue en Docker Hub.
- **Swagger:** Documentación interactiva de la API.
- **Conexión a MongoDB:** Base de datos configurada con manejo de errores robusto.

## Requisitos Específicos

1. **Router `mocks.router.js`:**
   - Crear un archivo llamado `mocks.router.js` que maneje las rutas bajo la base `/api/mocks`.
   - Mover el endpoint `/mockingpets` desarrollado anteriormente dentro de este router.

2. **Módulo de Mocking:**
   - Crear un módulo que permita generar usuarios ficticios según un parámetro numérico.
   - Los usuarios generados deben tener las siguientes propiedades:
     - Contraseña encriptada con el valor `coder123`.
     - Rol que puede alternar entre `user` y `admin`.
     - Array vacío para `pets`.

3. **Endpoint `/mockingusers` (GET):**
   - Implementar en `mocks.router.js`.
   - Generar 50 usuarios con las características mencionadas, en un formato similar a una consulta en MongoDB.

4. **Endpoint `/generateData` (POST):**
   - Implementar en `mocks.router.js`.
   - Recibir los parámetros numéricos `users` y `pets` en el cuerpo de la solicitud.
   - Generar e insertar en la base de datos la cantidad de registros indicada para ambos tipos de datos.

5. **Verificación de Datos:**
   - Comprobar los registros insertados utilizando los servicios GET de usuarios y mascotas.

6. **Testing:**
   - Desarrollar los tests funcionales para todos los endpoints del router `adoption.router.js`.

7. **Docker:**
   - Desarrollar el Dockerfile para generar una imagen del proyecto.
   - Subir la imagen de Docker a Dockerhub y añadir en un ReadMe.md al proyecto que contenga el link de dicha imagen.

8. **Documentación Swagger**

   - Documentar la API con Swagger

## Instrucciones Adicionales
- Utilizar Faker.js para la generación de datos ficticios.
- Implementar el cifrado de contraseñas usando bcrypt.

## Instalación

Sigue estos pasos para clonar el repositorio, instalar las dependencias y ejecutar el proyecto:

1. Clona el repositorio:
    ```sh
    git clone https://github.com/optimuspab/BackendIIFinal.git
    ```

2. Navega al directorio del proyecto:
    ```sh
    cd BackendIIFinal
    ```

3. Instala las dependencias:
    ```sh
    npm install
    ```

4. Configura las variables de entorno en un archivo `.env` en la raíz del proyecto:

    ### Ejemplo de Archivo `.env`
    ```plaintext
   MONGO_URI=tu_uri_de_mongodb
   MONGO_CERT_PATH=./config/cert.pem

   NODE_ENV=development
    ```

5. Inicia el servidor:
    ```sh
    npm start
    ```

El servidor se ejecutará en `http://localhost:8080`.

---

## **Documentación Swagger**

La API está documentada usando Swagger. Accede a la documentación en:
```
http://localhost:8080/api-docs
```

---

## **Endpoints Disponibles**

### **Usuarios**
- **GET /api/mocks/mockingusers**
  - **Descripción:** Genera usuarios ficticios.
  - **Parámetros:**
    - `quantity` (opcional): Número de usuarios a generar. Por defecto: 50.
  - **Ejemplo:**
    ```bash
    curl http://localhost:8080/api/mocks/mockingusers
    ```

- **POST /api/mocks/generateData**
  - **Descripción:** Genera datos de usuarios y mascotas.
  - **Body:**
    ```json
    {
      "users": 10,
      "pets": 15
    }
    ```
  - **Ejemplo:**
    ```bash
    curl -X POST http://localhost:8080/api/mocks/generateData -H "Content-Type: application/json" -d '{"users": 10, "pets": 15}'
    ```

### **Mascotas**
- **GET /api/mocks/mockingpets**
  - **Descripción:** Genera mascotas ficticias.
  - **Parámetros:**
    - `quantity` (opcional): Número de mascotas a generar. Por defecto: 100.
  - **Ejemplo:**
    ```bash
    curl http://localhost:8080/api/mocks/mockingpets
    ```

---

## **Pruebas**

### **Ejecutar las Pruebas**

Las pruebas están automatizadas usando `assert`.

1. **Pruebas Funcionales:**
   ```bash
   node src/tests/functional_tests_routes.js
   ```

2. **Pruebas de Mocking:**
   ```bash
   node src/tests/mocks.js
   ```

---

## **Uso con Docker**

### **Imagen desde Docker Hub**
Puedes usar la imagen directamente desde Docker Hub:
```bash
docker pull pguillermet/backendiii-final:1.0
```

Link de imagen de docker:
```
https://hub.docker.com/r/pguillermet/backendiii-final/tags
```

Ejecuta la imagen:
```bash
docker run -d -p 8080:8080 -p 3000:3000 pguillermet/backendiii-final:1.0
```

Verificar si el container esta en ejecución:
```bash
docker ps
```

Ver los logs del container:
```bash
docker logs <container-id>
```
---