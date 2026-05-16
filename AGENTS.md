# AGENTS.md - Hagemsa Activos Service

## Proposito

Este proyecto implementa el backend del **BC-13 Gestion de Activos**.

Activos es el maestro oficial y fuente de verdad de las unidades vehiculares y activos de Hagemsa. Otros bounded contexts, como Flota y Combustible, no deben modificar directamente la base de datos de Activos; deben consumir endpoints o contratos definidos.

## Stack

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Swagger / OpenAPI
- Jest

## Arquitectura

El proyecto sigue una organizacion inspirada en DDD:

```txt
src/
  domain/
    aggregates/
    entities/
    events/
    repositories/
    services/
    value-objects/
  application/
    dto/
    ports/
    use-cases/
  infrastructure/
    config/
    external-services/
    messaging/
    persistence/
      prisma/
  interfaces/
    consumers/
    http/
```

## Reglas de trabajo

- Mantener la logica de negocio en `domain/` o `application/`, no en controllers.
- Los controllers solo deben recibir HTTP, validar DTOs y llamar casos de uso.
- Prisma pertenece a infraestructura; no usar modelos Prisma como entidades de dominio.
- No exponer tablas completas para integraciones externas si basta un DTO reducido.
- No permitir que Flota o Combustible dependan del ID interno de base de datos.
- Para integracion con Flota usar placa cuando el contrato lo pida.
- Para integracion con Combustible usar codigo del activo.
- Registrar cambios relevantes en historial cuando aplique.
- No modificar migraciones antiguas si ya fueron aplicadas; crear una migracion nueva.

## Identificadores importantes

- `id`: identificador tecnico interno.
- `codigo`: identificador funcional del activo.
- `placaRodaje`: identificador vehicular usado por Flota.

## Estados

Estado activo:

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

## Endpoints relevantes

Swagger:

```txt
GET /docs
```

CRUD interno de Activos:

```txt
POST /activos
GET /activos
GET /activos/codigo/:codigo
PATCH /activos/:id
PATCH /activos/:id/estado-activo
PATCH /activos/:id/estado-calibracion
PATCH /activos/:id/siniestrar
```

Integracion con Flota:

```txt
GET /activos/placa/:placa/perfil-flota
PATCH /activos/placa/:placa/estado-operativo
```

Integracion con Combustible:

```txt
GET /activos/codigo/:codigo/perfil-combustible
```

## Flujo de integracion con Flota

Consulta:

```txt
Flota -> ActivosController -> ObtenerPerfilActivoUseCase -> ActivoRepository -> Prisma -> PostgreSQL
```

Actualizacion de estado operativo:

```txt
Flota -> PATCH por placa -> CambiarEstadosActivoUseCase -> ActivoRepository -> vehiculos_detalle.estadoOperativo
```

El estado operativo se guarda en Activos porque Activos es la fuente de verdad.

## Comandos

Instalar dependencias:

```bash
npm install
```

Ejecutar en desarrollo:

```bash
npm run start:dev
```

Compilar:

```bash
npm run build
```

Pruebas:

```bash
npm test -- --runInBand
```

Generar Prisma Client:

```bash
npx prisma generate
```

Crear/aplicar migracion:

```bash
npx prisma migrate dev --name nombre_migracion
```

Ver base de datos con Prisma Studio:

```bash
npx prisma studio
```

## Base de datos

Tablas principales:

```txt
activos
vehiculos_detalle
documentos_activo
imagenes_activo
equipamiento_activo
activos_historial
```

Regla practica para editar en DBeaver:

- Si se edita `activos`, incluir `activos.id`.
- Si se edita `vehiculos_detalle`, incluir `vehiculos_detalle.id`.
- En consultas con `JOIN`, preferir `UPDATE` manual para evitar problemas con `VIRTUAL_PK`.

Ejemplo:

```sql
update vehiculos_detalle
set "estadoOperativo" = 'NO_OPERATIVO'
where "placaRodaje" = 'BTZ-750';
```

## Documentacion relacionada

Desde la carpeta raiz `activo/docs`:

```txt
DOCUMENTO_TECNICO.md
HISTORIAS_USUARIO_ACTIVOS.md
BC-13-GESTION-DE-ACTIVOS.md
```

## Pendientes conocidos

- Agregar campo `peso` si se confirma como especificacion obligatoria.
- Implementar filtro por contrato via Flota.
- Validar con Flota antes de inactivar o siniestrar una unidad.
- Separar controllers de integracion: Activos, Flota y Combustible.
- Implementar publicacion real de eventos de dominio.
- Agregar autenticacion/autorizacion entre microservicios.
- Definir aprobaciones del Jefe de Flota.
