
# Comisión 70105 - Programación Backend III: Primera Entrega

# Documentación del Proyecto

## Objetivos

### Objetivo General

Este proyecto tiene como objetivo implementar funcionalidades para la generación y gestión de datos ficticios (mocks) en una API basada en Node.js y MongoDB.

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

## Ejemplo de Uso
Puedes utilizar Postman o cualquier cliente HTTP para interactuar con las rutas de productos y carritos. Además, la vista de inicio, registro de usuario y demás están disponibles en el navegador.
