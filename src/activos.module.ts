import { Module } from '@nestjs/common';
import { CrearActivoUseCase } from './application/use-cases/crear-activo.use-case';
import { ListarActivosUseCase } from './application/use-cases/listar-activos.use-case';
import { ObtenerActivoUseCase } from './application/use-cases/obtener-activo.use-case';
import { ActualizarActivoUseCase } from './application/use-cases/actualizar-activo.use-case';
import { RetirarActivoUseCase } from './application/use-cases/retirar-activo.use-case';
import { ObtenerPerfilActivoUseCase } from './application/use-cases/obtener-perfil-activo.use-case';
import { CambiarEstadosActivoUseCase } from './application/use-cases/cambiar-estados-activo.use-case';
import { GestionarDocumentosActivoUseCase } from './application/use-cases/gestionar-documentos-activo.use-case';
import { GestionarComplementosActivoUseCase } from './application/use-cases/gestionar-complementos-activo.use-case';
import { DOMAIN_EVENT_PUBLISHER } from './application/ports/domain-event-publisher.port';
import { ACTIVO_REPOSITORY } from './domain/repositories/activo.repository';
import { DOCUMENTO_ACTIVO_REPOSITORY } from './domain/repositories/documento-activo.repository';
import { HISTORIAL_ACTIVO_REPOSITORY } from './domain/repositories/historial-activo.repository';
import { PrismaActivoRepository } from './infrastructure/persistence/prisma/prisma-activo.repository';
import { PrismaDocumentoActivoRepository } from './infrastructure/persistence/prisma/prisma-documento-activo.repository';
import { PrismaHistorialActivoRepository } from './infrastructure/persistence/prisma/prisma-historial-activo.repository';
import { PrismaService } from './infrastructure/persistence/prisma/prisma.service';
import { NoopDomainEventPublisher } from './infrastructure/messaging/noop-domain-event.publisher';
import { ActivosController } from './interfaces/http/activos.controller';

@Module({
  controllers: [ActivosController],
  providers: [
    CrearActivoUseCase,
    ListarActivosUseCase,
    ObtenerActivoUseCase,
    ObtenerPerfilActivoUseCase,
    CambiarEstadosActivoUseCase,
    GestionarDocumentosActivoUseCase,
    GestionarComplementosActivoUseCase,
    ActualizarActivoUseCase,
    RetirarActivoUseCase,
    PrismaService,
    {
      provide: ACTIVO_REPOSITORY,
      useClass: PrismaActivoRepository,
    },
    {
      provide: DOCUMENTO_ACTIVO_REPOSITORY,
      useClass: PrismaDocumentoActivoRepository,
    },
    {
      provide: HISTORIAL_ACTIVO_REPOSITORY,
      useClass: PrismaHistorialActivoRepository,
    },
    {
      provide: DOMAIN_EVENT_PUBLISHER,
      useClass: NoopDomainEventPublisher,
    },
  ],
})
export class ActivosModule {}
