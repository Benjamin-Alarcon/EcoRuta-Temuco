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
- JavaScript / JSX con React 19 y Vite 8
- React Router para las rutas del sitio
- json-server 0.17.4 como API propia local
- Open-Meteo como API pública del clima

## Cómo ejecutar el proyecto

Desde la raíz del repositorio:

```bash
cd app
npm install
```

En una terminal, dentro de `app`, levantar la API:

```bash
npm run api
```

En otra terminal, también dentro de `app`, levantar la aplicación:

```bash
npm run dev
```

La aplicación queda en `http://localhost:5173` y la API en `http://localhost:3001`.
También puede usarse `npm ci` en lugar de `npm install` si se respeta el lockfile.

## Estado del proyecto

- Sprint actual: Sprint 3 (Laboratorio 06 · integración de la aplicación con la API propia)
- Última actualización: 23/11/2026

## Tablero Kanban

Enlace al tablero: https://trello.com/invite/b/6a7e001cb03b372969548e75/ATTI488fd198bc13e40aa1591f922210981411B034AB/ecoruta

## Enlace de despliegue

https://benjamin-alarcon.github.io/EcoRuta-Temuco/


## Contrato de API

La API propia se levanta desde `app` con el script `api` definido en `app/package.json`
(usa `json-server@0.17.4` con `--watch db.json --port 3001`):

```bash
cd app
npm run api
```

La API queda disponible en `http://localhost:3001`. Las operaciones de escritura
modifican `app/db.json`, así que conviene respaldar ese archivo antes de probar
`POST` o `DELETE`. El frontend obtiene la URL base desde `app/src/api.js`
(`API_URL`); no la escribe directamente en las vistas.

### Recursos y modelos

#### `rutas`

| Campo | Tipo | Notas |
|---|---|---|
| `id` | number | Lo genera el servidor. |
| `nombre` | string | Obligatorio. |
| `imagen` | string | Obligatorio. Ruta relativa al sitio estático, con prefijo `img/`. |
| `alt` | string | Obligatorio. Texto alternativo de la imagen. |
| `distanciaKm` | number | Obligatorio, mayor que 0. |
| `dificultad` | string | Obligatorio: `baja`, `media` o `alta`. |
| `accesible` | boolean | Obligatorio. |
| `descripcion` | string | Opcional. |

Ejemplo:

```json
{
  "id": 1,
  "nombre": "Cerro Ñielol",
  "imagen": "img/cerro-nielol.jpg",
  "alt": "Bosque nativo, mirador y postal desde el cerro ñielol",
  "distanciaKm": 4.5,
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
| GET | `/rutas` | Nada | Arreglo de rutas | 200 | `Inicio.jsx`, `Rutas.jsx` |
| GET | `/rutas/:id` | Nada | Una ruta | 200 o 404 | `DetalleRuta.jsx` |
| GET | `/emprendimientos` | Nada | Arreglo de emprendimientos | 200 | `Emprendimientos.jsx`, `GestionEmprendimientos.jsx` |
| POST | `/emprendimientos` | `nombre`, `correo`, `descripcion`, `numero` | Emprendimiento creado con su `id` | 201 | `FormularioEmprendimiento.jsx` |
| DELETE | `/emprendimientos/:id` | Nada | `{}` | 200 o 404 | `GestionEmprendimientos.jsx` |
| GET | `/mensajes` | Nada | Arreglo de mensajes | 200 | `ListaMensajes.jsx` en Administración |
| POST | `/mensajes` | `nombre`, `correo`, `asunto`, `contenido`, `fecha` | Mensaje creado con su `id` | 201 | `Nosotros.jsx` |

Las lecturas usan `fetch` dentro de `useEffect` con `API_URL`. No se implementó
`DELETE /mensajes` porque el contrato no lo define. Tampoco se usan los recursos
`resenas` ni campos como `rutaId`, `autor` o `nota`, que aparecen en el ejemplo del
laboratorio pero no pertenecen a este proyecto.

### Estado real de implementación

- Los encargos A, B, C, D y E quedaron fusionados en `main` mediante los PR #31,
  #32, #33, #34 y #35.
- `AdministracionEmprendimientos.jsx` integra el formulario y la gestión de
  emprendimientos. Al crear uno, `onCreado` incrementa un estado que recarga el
  listado; la ruta `/administracion` se enlaza desde el pie de página.
- `/nosotros` envía `POST /mensajes` con `nombre`, `correo`, `asunto`, `contenido` y
  `fecha`; `/administracion` muestra los mensajes con `GET /mensajes`.
- `app/db.json` conserva los datos originales; las pruebas de escritura se hacen
  con respaldo y restauración.

### API pública externa

El proyecto consulta la API de clima **Open-Meteo**:

- Endpoint: `https://api.open-meteo.com/v1/forecast`
- Parámetros: `latitude`, `longitude`, `current=temperature_2m,wind_speed_10m,weather_code` y `timezone=America/Santiago`.
- Se usa para mostrar temperatura, velocidad del viento y condición del cielo en las tarjetas de rutas.

### API externa de mapas (OpenStreetMap / Nominatim)

- Servicio: geocodificación de Nominatim (OpenStreetMap). No es la API del clima.
- Vista elegida: `Destinos`, sección "Lugares en OpenStreetMap" del componente `PuntosInteresOSM`.
- Uso: mostrar el nombre completo, la latitud y la longitud de los destinos de La Araucanía (por ejemplo, Cerro Ñielol) y enlazar cada resultado a su ubicación en el mapa, como apoyo a la planificación de rutas.
- Endpoint: `https://nominatim.openstreetmap.org/search?format=jsonv2&countrycodes=cl&q=Cerro%20%C3%91ielol%2C%20Temuco&limit=3`
- Parámetros: `format=jsonv2`, `countrycodes=cl`, `q=Cerro Ñielol, Temuco` y `limit=3`.
- No requiere clave ni token. La respuesta incluye `display_name`, `lat`, `lon`, `osm_type`, `osm_id` y `name`.
- Se hace una sola petición por carga de la vista para respetar el límite de Nominatim (máximo 1 petición por segundo).
- Los datos se muestran con la atribución obligatoria `© OpenStreetMap contributors` y enlace a la licencia ODbL.

Prueba realizada desde el navegador (consola de la app local con Vite en marcha): la petición devolvió **HTTP 200**, sin errores de CORS (`Access-Control-Allow-Origin: *`), y el `fetch` pudo leer el JSON con 3 resultados:

```js
fetch("https://nominatim.openstreetmap.org/search?format=jsonv2&countrycodes=cl&q=Cerro%20%C3%91ielol%2C%20Temuco&limit=3")
  .then((respuesta) => respuesta.json())
  .then((datos) => console.log(datos))
  .catch((error) => console.error(error));
```

| `display_name` | `lat` | `lon` |
|---|---|---|
| Cerro Ñielol, Hacienda Las Mariposas 2, Temuco, Provincia de Cautín, Región de la Araucanía, 4780764, Chile | -38.6998788 | -72.5515808 |
| Cerro Ñielol, Condominio Las Mariposas 3, Temuco, Provincia de Cautín, Región de la Araucanía, 4780764, Chile | -38.6978954 | -72.5488937 |
| Cerro Ñielol, Hacienda Las Mariposas 1, Temuco, Provincia de Cautín, Región de la Araucanía, 4780764, Chile | -38.6988077 | -72.5499259 |

Prueba de falla: se bloqueó **solo** `nominatim.openstreetmap.org` en Chrome con `--host-resolver-rules="MAP nominatim.openstreetmap.org 127.0.0.1"`, sin detener Vite ni la API local. La vista `#/destinos` sigue visible con encabezado, título, texto y pie de página; dentro de su sección aparece:

```html
<p class="lista estado error" role="alert">
  No se pudieron cargar los lugares de OpenStreetMap.
</p>
```

No se renderizan tarjetas (`tarjeta-osm`) y las demás vistas no se ven afectadas. El error queda confinado al componente, no rompe la página.
