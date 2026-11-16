# Nombre del Proyecto / Estudio

EcoRuta Temuco / Waylabs

## Integrantes y roles (Sprint actual)

| Nombre | Rol ágil |
|---|---|
| Lucas Villegas | Developer |
| Elias Cayuqueo | Developer |
| Piero Soto | Product Owner |
| Benjamín Alarcón | Scrum Master |
| Nicolás Calderón | QA/Tester |
| Lucas Martinez | Developer |
## Descripción breve

> Sitio Web adaptado para dispositivos moviles y sobremesa con el fin de ayudar a los turistas en su visita a la Región de La Araucania, ofreciendo rutas, puntos de interes, actividades al aire libre y dando a conocer emprendimientos sustentables por la IX Región.

## Tecnologías utilizadas

- HTML5 / CSS3
- JavaScript / TypeScript
- (Framework a definir)
- (API consumida)

## Cómo ejecutar el proyecto

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

## Estado del proyecto

- Sprint actual: Sprint 2 (Kickoff)
- Última actualización: 27/10/2026

## Tablero Kanban

Enlace al tablero: https://trello.com/invite/b/6a7e001cb03b372969548e75/ATTI488fd198bc13e40aa1591f922210981411B034AB/ecoruta

## Enlace de despliegue

https://benjamin-alarcon.github.io/EcoRuta-Temuco/


## Contrato de API
### Recursos y modelos

#### `rutas`

| Campo | Tipo | Notas |
|---|---|---|
| `id` | number | Lo genera el servidor. |
| `nombre` | string | Obligatorio. |
| `distanciaKm` | number | Obligatorio, mayor que 0. |
| `dificultad` | string | Obligatorio: `baja`, `media` o `alta`. |
| `accesible` | boolean | Obligatorio. |
| `descripcion` | string | Opcional. |

Ejemplo:

```json
{
  "id": 1,
  "nombre": "Cerro Ñielol",
  "distanciaKm": 4,
  "dificultad": "baja",
  "accesible": true,
  "descripcion": "Sendero corto en el cerro"
}
```

#### `emprendimientos`

| Campo | Tipo | Notas |
|---|---|---|
| `id` | number | Lo genera el servidor. |
| `nombre` | string | Obligatorio. |
| `correo` | string | Obligatorio. |
| `descripcion` | string | Obligatorio. |
| `numero` | number | Obligatorio. |

Ejemplo:

```json
{
  "id": 1,
  "nombre": "Turismo Sur",
  "correo": "turismosur@gmail.com",
  "descripcion": "Empresa de turismo",
  "numero": 978123428
}
```

Al crear un emprendimiento, el frontend envía `nombre`, `correo`, `descripcion` y `numero`. No envía `id`; lo genera el servidor.

#### `mensajes`

| Campo | Tipo | Notas |
|---|---|---|
| `id` | number | Lo genera el servidor. |
| `nombre` | string | Obligatorio. |
| `correo` | string | Obligatorio. |
| `asunto` | string | Obligatorio. |
| `contenido` | string | Obligatorio. |
| `fecha` | string | Fecha y hora en formato ISO 8601; la genera el frontend. |

Ejemplo:

```json
{
  "id": 1,
  "nombre": "Ana Pérez",
  "correo": "ana@example.com",
  "asunto": "Consulta por tours",
  "contenido": "¿Aceptan mascotas?",
  "fecha": "2026-11-20T10:00:00"
}
```

Al crear un mensaje, el frontend envía `nombre`, `correo`, `asunto`, `contenido` y `fecha`. No envía `id`; lo genera el servidor.

### Endpoints de la API propia

| Método | Endpoint | Envía el frontend | Responde la API | Código | Vista o componente |
|---|---|---|---|---|---|
| GET | `/rutas` | Nada | Arreglo de rutas | 200 | Inicio, Rutas |
| GET | `/rutas/:id` | Nada | Una ruta | 200 o 404 | Detalle de ruta |
| GET | `/emprendimientos` | Nada | Arreglo de emprendimientos | 200 | Emprendimientos, Administración |
| POST | `/emprendimientos` | `nombre`, `correo`, `descripcion`, `numero` | Emprendimiento creado con su `id` | 201 | Administración |
| DELETE | `/emprendimientos/:id` | Nada | `{}` | 200 o 404 | Administración |
| GET | `/mensajes` | Nada | Arreglo de mensajes | 200 | Administración |
| POST | `/mensajes` | `nombre`, `correo`, `asunto`, `contenido`, `fecha` | Mensaje creado con su `id` | 201 | Nosotros |

### API pública externa

El proyecto consulta la API de clima **Open-Meteo**:

- Endpoint: `https://api.open-meteo.com/v1/forecast`
- Parámetros: `latitude`, `longitude`, `current=temperature_2m,wind_speed_10m,weather_code` y `timezone=America/Santiago`.
- Se usa para mostrar temperatura, velocidad del viento y condición del cielo en las tarjetas de rutas.