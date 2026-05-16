import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ActualizarDocumentoActivoDto } from '../dto/actualizar-documento-activo.dto';
import { CrearDocumentoActivoDto } from '../dto/crear-documento-activo.dto';
import { EstadoDocumentoActivo } from '../../domain/entities/documento-activo.entity';
import { ACTIVO_REPOSITORY } from '../../domain/repositories/activo.repository';
import type { ActivoRepository } from '../../domain/repositories/activo.repository';
import { DOCUMENTO_ACTIVO_REPOSITORY } from '../../domain/repositories/documento-activo.repository';
import type { DocumentoActivoRepository } from '../../domain/repositories/documento-activo.repository';

@Injectable()
export class GestionarDocumentosActivoUseCase {
  constructor(
    @Inject(ACTIVO_REPOSITORY)
    private readonly activoRepository: ActivoRepository,
    @Inject(DOCUMENTO_ACTIVO_REPOSITORY)
    private readonly documentoActivoRepository: DocumentoActivoRepository,
  ) {}

  async listar(activoId: string) {
    await this.validarActivo(activoId);
    return this.listarPorActivoId(activoId);
  }

  async listarPorCodigo(codigo: string) {
    const activoId = await this.obtenerActivoIdPorCodigo(codigo);
    return this.listarPorActivoId(activoId);
  }

  private async listarPorActivoId(activoId: string) {
    return this.documentoActivoRepository.findByActivoId(activoId);
  }

  async crear(activoId: string, dto: CrearDocumentoActivoDto) {
    await this.validarActivo(activoId);
    return this.crearPorActivoId(activoId, dto);
  }

  async crearPorCodigo(codigo: string, dto: CrearDocumentoActivoDto) {
    const activoId = await this.obtenerActivoIdPorCodigo(codigo);
    return this.crearPorActivoId(activoId, dto);
  }

  private async crearPorActivoId(activoId: string, dto: CrearDocumentoActivoDto) {
    return this.documentoActivoRepository.create({
      activoId,
      tipoDocumento: dto.tipoDocumento,
      estadoDocumento: dto.estadoDocumento ?? EstadoDocumentoActivo.PENDIENTE,
      numero: dto.numero,
      fechaEmision: dto.fechaEmision ? new Date(dto.fechaEmision) : undefined,
      fechaVencimiento: dto.fechaVencimiento
        ? new Date(dto.fechaVencimiento)
        : undefined,
      archivoUrl: dto.archivoUrl,
      observacion: dto.observacion,
    });
  }

  async actualizar(
    activoId: string,
    documentoId: string,
    dto: ActualizarDocumentoActivoDto,
  ) {
    await this.validarDocumento(activoId, documentoId);
    return this.actualizarPorActivoId(activoId, documentoId, dto);
  }

  async actualizarPorCodigo(
    codigo: string,
    documentoId: string,
    dto: ActualizarDocumentoActivoDto,
  ) {
    const activoId = await this.obtenerActivoIdPorCodigo(codigo);
    return this.actualizarPorActivoId(activoId, documentoId, dto);
  }

  private async actualizarPorActivoId(
    activoId: string,
    documentoId: string,
    dto: ActualizarDocumentoActivoDto,
  ) {
    await this.validarDocumento(activoId, documentoId);

    return this.documentoActivoRepository.update(documentoId, {
      tipoDocumento: dto.tipoDocumento,
      estadoDocumento: dto.estadoDocumento,
      numero: dto.numero,
      fechaEmision: dto.fechaEmision ? new Date(dto.fechaEmision) : undefined,
      fechaVencimiento: dto.fechaVencimiento
        ? new Date(dto.fechaVencimiento)
        : undefined,
      archivoUrl: dto.archivoUrl,
      observacion: dto.observacion,
    });
  }

  private async validarActivo(activoId: string) {
    const activo = await this.activoRepository.findById(activoId);

    if (!activo) {
      throw new NotFoundException(`Activo ${activoId} no encontrado`);
    }
  }

  private async obtenerActivoIdPorCodigo(codigo: string) {
    const activo = await this.activoRepository.findByCodigo(codigo);

    if (!activo) {
      throw new NotFoundException(`Activo con codigo ${codigo} no encontrado`);
    }

    return activo.toPrimitives().id;
  }

  private async validarDocumento(activoId: string, documentoId: string) {
    const documento = await this.documentoActivoRepository.existsForActivo(
      activoId,
      documentoId,
    );

    if (!documento) {
      throw new NotFoundException(`Documento ${documentoId} no encontrado`);
    }
  }
}
