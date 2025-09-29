# ToDo API PoC

Este es un proyecto de prueba de concepto (PoC) de una API REST para manejo de tareas.
Incluye autenticación JWT y persistencia en PostgreSQL.

---

## Tecnologías

- Node.js (ES Modules)
- Express
- PostgreSQL
- Docker & Docker Compose
- K6 (pruebas de carga)

---

## Estructura

- `src/` - Código fuente

  - `routes/` - Endpoints de `auth` y `tasks`
  - `middleware/` - Middleware de autenticación
  - `db/` - Configuración de base de datos y migraciones
  - `index.js` - Archivo principal

- `docker-compose.yml` - Orquestación de contenedores
- `Dockerfile` - Imagen de la API
- `schema.sql` - Esquema inicial de la base de datos
- `openapi.yaml` - Documentación OpenAPI
- `test/` - Scripts de prueba (ej. K6)

---

## Configuración

1. Clonar el repositorio:

```bash
git clone https://github.com/isadiazac/rest-api-poc.git
cd rest-api-poc
```

2. Configurar el archivo `.env` con tu información de conexión a PostgreSQL y JWT (no incluido en el repo por seguridad).

3. Levantar los contenedores:

```bash
docker compose up --build
```

- La API estará disponible en `http://localhost:3000`
- PostgreSQL escucha en el puerto `5432`.

4. Migrar la base de datos (opcional):

```bash
docker exec -it rest_api_poc_api node src/index.js migrate
```

---

## Endpoints

- **Health check:** `GET /health`
- **Autenticación**

  - `POST /api/v1/auth/register` – Registrar usuario
  - `POST /api/v1/auth/login` – Iniciar sesión

- **Tareas** (requiere JWT)

  - `GET /api/v1/tasks` – Listar tareas
  - `POST /api/v1/tasks` – Crear tarea
  - `PUT /api/v1/tasks/{id}` – Marcar tarea completada
  - `DELETE /api/v1/tasks/{id}` – Eliminar tarea
 
## Documentación con openapi-postman
[PoC](https://isadiac06-8447466.postman.co/workspace/Isabela-D%C3%ADaz-Acosta's-Workspace~9e2b66f0-0753-4365-8205-f3c81aec62b1/collection/48860550-eca021e8-fcab-48a4-84b6-59263ce4c8b5?action=share&creator=48860550)

---

## Prueba de carga con K6

Se incluye un script de prueba `test/k6_load_test.js` para simular múltiples usuarios accediendo a la API.

Ejemplo de ejecución usando Docker:

```bash
docker run --rm -i -v ${PWD}/test:/scripts -w /scripts grafana/k6 run k6_load_test.js
```

- Simula usuarios realizando login y consultando tareas.
- Útil para medir rendimiento y tiempos de respuesta.

---

## Uso con contenedores

### Acceder al bash del contenedor

```bash
docker exec -it rest_api_poc_api bash
```

Para salir:

```bash
exit
```

o `Ctrl + D`.

### Detener todos los contenedores

```bash
docker compose down
```

---

## Usuario de prueba para requests

- **Usuario:** `isabela`
- **Contraseña:** `123456`
