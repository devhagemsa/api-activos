import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CambiarEstadoActivoDto } from '../dto/cambiar-estado-activo.dto';
import { CambiarEstadoCalibracionDto } from '../dto/cambiar-estado-calibracion.dto';
import { CambiarEstadoOperativoDto } from '../dto/cambiar-estado-operativo.dto';
import {
  EstadoActivo,
  EstadoCalibracion,
  EstadoOperativo,
} from '../../domain/aggregates/activo.aggregate';
import { EstadoCalibracionCambiadoEvent } from '../../domain/events/estado-calibracion-cambiado.event';
import { EstadoOperativoCambiadoEvent } from '../../domain/events/estado-operativo-cambiado.event';
import { DOMAIN_EVENT_PUBLISHER } from '../ports/domain-event-publisher.port';
import type { DomainEventPublisher } from '../ports/domain-event-publisher.port';
import { ACTIVO_REPOSITORY } from '../../domain/repositories/activo.repository';
import type { ActivoRepository } from '../../domain/repositories/activo.repository';
import { HISTORIAL_ACTIVO_REPOSITORY } from '../../domain/repositories/historial-activo.repository';
import type { HistorialActivoRepository } from '../../domain/repositories/historial-activo.repository';

@Injectable()
export class CambiarEstadosActivoUseCase {
  constructor(
    @Inject(ACTIVO_REPOSITORY)
    private readonly activoRepository: ActivoRepository,
    @Inject(HISTORIAL_ACTIVO_REPOSITORY)
    private readonly historialActivoRepository: HistorialActivoRepository,
    @Inject(DOMAIN_EVENT_PUBLISHER)
    private readonly eventPublisher: DomainEventPublisher,
  ) {}

  async estadoActivo(id: string, dto: CambiarEstadoActivoDto) {
    const activo = await this.obtenerActivo(id);
    return this.cambiarEstadoActivo(activo, dto);
  }

  async estadoActivoPorCodigo(codigo: string, dto: CambiarEstadoActivoDto) {
    const activo = await this.obtenerActivoPorCodigo(codigo);
    return this.cambiarEstadoActivo(activo, dto);
  }

  private async cambiarEstadoActivo(activo, dto: CambiarEstadoActivoDto) {
    const data = activo.toPrimitives();
    const actualizado = activo.actualizar({
      estadoActivo: dto.estadoActivo,
    });

    await this.historialActivoRepository.registrar({
      activoId: data.id,
      tipoCambio: 'ESTADO_ACTIVO',
      valorAnterior: data.estadoActivo,
      valorNuevo: dto.estadoActivo,
      motivo: dto.motivo,
      usuario: dto.usuario,
    });

    return this.activoRepository.save(actualizado);
  }

  async estadoOperativo(id: string, dto: CambiarEstadoOperativoDto) {
    const activo = await this.obtenerActivo(id);
    return this.cambiarEstadoOperativo(activo, dto);
  }

  async estadoOperativoPorCodigo(codigo: string, dto: CambiarEstadoOperativoDto) {
    const activo = await this.obtenerActivoPorCodigo(codigo);
    return this.cambiarEstadoOperativo(activo, dto);
  }

  async estadoOperativoPorPlaca(placa: string, dto: CambiarEstadoOperativoDto) {
    const activo = await this.obtenerActivoPorPlaca(placa);
    return this.cambiarEstadoOperativo(activo, dto);
  }

  private async cambiarEstadoOperativo(activo, dto: CambiarEstadoOperativoDto) {
    const data = activo.toPrimitives();

    if (!data.vehiculo) {
      throw new BadRequestException('El activo no tiene detalle vehicular');
    }

    if (
      dto.estadoOperativo === EstadoOperativo.OPERATIVO &&
      data.estadoActivo !== EstadoActivo.ACTIVO
    ) {
      throw new BadRequestException(
        'Solo un activo ACTIVO puede marcarse como OPERATIVO',
      );
    }

    const actualizado = activo.actualizar({
      vehiculo: {
        ...data.vehiculo,
        estadoOperativo: dto.estadoOperativo,
      },
    });

    await this.historialActivoRepository.registrar({
      activoId: data.id,
      tipoCambio: 'ESTADO_OPERATIVO',
      valorAnterior: data.vehiculo.estadoOperativo,
      valorNuevo: dto.estadoOperativo,
      motivo: dto.motivo,
      usuario: dto.usuario,
    });

    await this.eventPublisher.publish(
      new EstadoOperativoCambiadoEvent(
        data.id,
        data.codigo,
        data.vehiculo.estadoOperativo,
        dto.estadoOperativo,
      ),
    );

    return this.activoRepository.save(actualizado);
  }

  async estadoCalibracion(id: string, dto: CambiarEstadoCalibracionDto) {
    const activo = await this.obtenerActivo(id);
    return this.cambiarEstadoCalibracion(activo, dto);
  }

  async estadoCalibracionPorCodigo(
    codigo: string,
    dto: CambiarEstadoCalibracionDto,
  ) {
    const activo = await this.obtenerActivoPorCodigo(codigo);
    return this.cambiarEstadoCalibracion(activo, dto);
  }

  private async cambiarEstadoCalibracion(
    activo,
    dto: CambiarEstadoCalibracionDto,
  ) {
    const data = activo.toPrimitives();

    if (!data.vehiculo) {
      throw new BadRequestException('El activo no tiene detalle vehicular');
    }

    if (
      dto.estadoCalibracion === EstadoCalibracion.NO_CALIBRADA &&
      dto.factorCorreccion === undefined &&
      data.vehiculo.factorCorreccion === null
    ) {
      throw new BadRequestException(
        'El factor de correccion es obligatorio para unidades no calibradas',
      );
    }

    const actualizado = activo.actualizar({
      vehiculo: {
        ...data.vehiculo,
        estadoCalibracion: dto.estadoCalibracion,
        factorCorreccion:
          dto.factorCorreccion ?? data.vehiculo.factorCorreccion,
      },
    });

    await this.historialActivoRepository.registrar({
      activoId: data.id,
      tipoCambio: 'ESTADO_CALIBRACION',
      valorAnterior: data.vehiculo.estadoCalibracion,
      valorNuevo: dto.estadoCalibracion,
      motivo: dto.motivo,
      usuario: dto.usuario,
    });

    await this.eventPublisher.publish(
      new EstadoCalibracionCambiadoEvent(
        data.id,
        data.codigo,
        data.vehiculo.estadoCalibracion,
        dto.estadoCalibracion,
      ),
    );

    return this.activoRepository.save(actualizado);
  }

  private async obtenerActivo(id: string) {
    const activo = await this.activoRepository.findById(id);

    if (!activo) {
      throw new NotFoundException(`Activo ${id} no encontrado`);
    }

    return activo;
  }

  private async obtenerActivoPorCodigo(codigo: string) {
    const activo = await this.activoRepository.findByCodigo(codigo);

    if (!activo) {
      throw new NotFoundException(`Activo con codigo ${codigo} no encontrado`);
    }

    return activo;
  }

  private async obtenerActivoPorPlaca(placa: string) {
    const activo = await this.activoRepository.findByPlaca(placa);

    if (!activo) {
      throw new NotFoundException(`Activo con placa ${placa} no encontrado`);
    }

    return activo;
  }
}
