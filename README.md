# Hagemsa Activos Service

## Descripcion

Microservicio backend para la gestion de activos de Hagemsa. Expone API REST documentada con Swagger y mantiene la informacion maestra de activos, unidades vehiculares, documentos, imagenes, equipamiento e historial.

Este servicio representa el bounded context de Activos. Otros modulos como Flota y Combustible deben integrarse por API o eventos, no accediendo directamente a la base de datos.

## Responsabilidades

- Registrar activos.
- Consultar activos por codigo, id o placa.
- Modificar informacion maestra.
- Gestionar estados del activo.
- Gestionar estado operativo vehicular.
- Registrar documentos, imagenes y equipamiento.
- Mantener historial de cambios.
- Exponer perfiles especificos para Flota y Combustible.

## Arquitectura

El proyecto sigue una estructura inspirada en DDD:

```txt
src/
  domain/
    aggregates/        Reglas centrales del agregado Activo
    entities/          Entidades del dominio
    value-objects/     Objetos de valor
    events/            Eventos de dominio
    repositories/      Contratos de persistencia
    services/          Servicios de dominio

  application/
    dto/               Contratos de entrada/salida
    ports/             Puertos de aplicacion
    use-cases/         Casos de uso

  infrastructure/
    persistence/       Implementaciones de repositorios
    messaging/         Publicacion de eventos
    config/            Configuracion tecnica
    external-services/ Integraciones externas

  interfaces/
    http/              Controllers REST
    consumers/         Consumidores de eventos futuros
```

## Modelo de base de datos

Tabla central:

- `activos`

Tablas relacionadas:

- `vehiculos_detalle`
- `documentos_activo`
- `imagenes_activo`
- `equipamiento_activo`
- `activos_historial`

Relacion principal:

```txt
activos
  ├── vehiculos_detalle
  ├── documentos_activo
  ├── imagenes_activo
  ├── equipamiento_activo
  └── activos_historial
```

## Catalogos principales

Estado del activo:

```txt
ACTIVO
INACTIVO
SINIESTRADO
```

Estado operativo:

```txt
OPERATIVO
MANTENIMIENTO
NO_OPERATIVO
```

Estado calibracion:

```txt
CALIBRADA
NO_CALIBRADA
PENDIENTE
OBSERVADA
```

## Endpoints principales

Swagger:

```txt
GET /docs
```

Activos:

```http
POST /activos
GET /activos
GET /activos/:id
GET /activos/codigo/:codigo
PATCH /activos/:id
PATCH /activos/:id/estado-activo
PATCH /activos/:id/estado-operativo
PATCH /activos/:id/estado-calibracion
PATCH /activos/:id/siniestrar
```

Flota:

```http
GET /activos/placa/:placa/perfil-flota
PATCH /activos/placa/:placa/estado-operativo
```

Combustible:

```http
GET /activos/codigo/:codigo/perfil-combustible
```

Documentos:

```http
GET /activos/codigo/:codigo/documentos
POST /activos/codigo/:codigo/documentos
PATCH /activos/codigo/:codigo/documentos/:documentoId
```

Imagenes:

```http
GET /activos/codigo/:codigo/imagenes
POST /activos/codigo/:codigo/imagenes
PATCH /activos/codigo/:codigo/imagenes/:imagenId
```

Equipamiento:

```http
GET /activos/codigo/:codigo/equipamiento
POST /activos/codigo/:codigo/equipamiento
PATCH /activos/codigo/:codigo/equipamiento/:equipamientoId
```

## Variables de entorno

Archivo `.env`:

```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/hagemsa_activos"
PORT=3000
CORS_ORIGINS=http://localhost:3001,http://127.0.0.1:3001
```

## Instalacion

```bash
npm install
```

## Base de datos

Aplicar migraciones:

```bash
npx prisma migrate dev
```

Generar Prisma Client:

```bash
npx prisma generate
```

Verificar enums en PostgreSQL:

```sql
select enumlabel
from pg_enum
where enumtypid = '"EstadoOperativo"'::regtype
order by enumsortorder;
```

## Ejecucion

Desarrollo:

```bash
npm run start:dev
```

Produccion:

```bash
npm run build
npm run start:prod
```

## Pruebas

```bash
npm test -- --runInBand
```

## Decisiones tecnicas

- Activos es fuente de verdad del maestro de unidades.
- Flota consume por placa, pero no accede directamente a la base de datos.
- Combustible consume un perfil reducido orientado a combustible.
- Los cambios relevantes se registran en `activos_historial`.
- Los eventos de dominio estan modelados para una futura integracion asincrona.

