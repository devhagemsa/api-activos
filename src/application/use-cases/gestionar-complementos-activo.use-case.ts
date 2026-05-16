import { Injectable, NotFoundException } from '@nestjs/common';
import { ActualizarEquipamientoActivoDto } from '../dto/actualizar-equipamiento-activo.dto';
import { ActualizarImagenActivoDto } from '../dto/actualizar-imagen-activo.dto';
import { CrearEquipamientoActivoDto } from '../dto/crear-equipamiento-activo.dto';
import { CrearImagenActivoDto } from '../dto/crear-imagen-activo.dto';
import {
  EquipamientoActivo,
  EstadoEquipamientoActivo,
} from '../../domain/entities/equipamiento-activo.entity';
import {
  ImagenActivo,
  TipoImagenActivo,
} from '../../domain/entities/imagen-activo.entity';
import { PrismaService } from '../../infrastructure/persistence/prisma/prisma.service';

@Injectable()
export class GestionarComplementosActivoUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async listarImagenesPorCodigo(codigo: string) {
    const activoId = await this.obtenerActivoIdPorCodigo(codigo);
    const imagenes = await this.prisma.imagenActivo.findMany({
      where: { activoId },
      orderBy: [{ orden: 'asc' }, { createdAt: 'asc' }],
    });

    return imagenes.map((imagen) => this.toImagenDomain(imagen));
  }

  async crearImagenPorCodigo(codigo: string, dto: CrearImagenActivoDto) {
    const activoId = await this.obtenerActivoIdPorCodigo(codigo);
    const imagen = await this.prisma.imagenActivo.create({
      data: {
        activoId,
        tipoImagen: dto.tipoImagen,
        url: dto.url,
        descripcion: dto.descripcion,
        orden: dto.orden ?? 0,
      },
    });

    return this.toImagenDomain(imagen);
  }

  async actualizarImagenPorCodigo(
    codigo: string,
    imagenId: string,
    dto: ActualizarImagenActivoDto,
  ) {
    const activoId = await this.obtenerActivoIdPorCodigo(codigo);
    await this.validarImagen(activoId, imagenId);
    const imagen = await this.prisma.imagenActivo.update({
      where: { id: imagenId },
      data: dto,
    });

    return this.toImagenDomain(imagen);
  }

  async listarEquipamientoPorCodigo(codigo: string) {
    const activoId = await this.obtenerActivoIdPorCodigo(codigo);
    const equipamiento = await this.prisma.equipamientoActivo.findMany({
      where: { activoId },
      orderBy: [{ nombre: 'asc' }],
    });

    return equipamiento.map((item) => this.toEquipamientoDomain(item));
  }

  async crearEquipamientoPorCodigo(
    codigo: string,
    dto: CrearEquipamientoActivoDto,
  ) {
    const activoId = await this.obtenerActivoIdPorCodigo(codigo);
    const equipamiento = await this.prisma.equipamientoActivo.create({
      data: {
        activoId,
        nombre: dto.nombre.trim().toUpperCase(),
        estado: dto.estado ?? EstadoEquipamientoActivo.PENDIENTE,
        descripcion: dto.descripcion,
        observacion: dto.observacion,
      },
    });

    return this.toEquipamientoDomain(equipamiento);
  }

  async actualizarEquipamientoPorCodigo(
    codigo: string,
    equipamientoId: string,
    dto: ActualizarEquipamientoActivoDto,
  ) {
    const activoId = await this.obtenerActivoIdPorCodigo(codigo);
    await this.validarEquipamiento(activoId, equipamientoId);
    const equipamiento = await this.prisma.equipamientoActivo.update({
      where: { id: equipamientoId },
      data: {
        ...dto,
        nombre: dto.nombre?.trim().toUpperCase(),
      },
    });

    return this.toEquipamientoDomain(equipamiento);
  }

  private async obtenerActivoIdPorCodigo(codigo: string) {
    const activo = await this.prisma.activo.findUnique({
      where: { codigo: codigo.trim().toUpperCase() },
      select: { id: true },
    });

    if (!activo) {
      throw new NotFoundException(`Activo con codigo ${codigo} no encontrado`);
    }

    return activo.id;
  }

  private async validarImagen(activoId: string, imagenId: string) {
    const imagen = await this.prisma.imagenActivo.findFirst({
      where: { id: imagenId, activoId },
      select: { id: true },
    });

    if (!imagen) {
      throw new NotFoundException(`Imagen ${imagenId} no encontrada`);
    }
  }

  private async validarEquipamiento(activoId: string, equipamientoId: string) {
    const equipamiento = await this.prisma.equipamientoActivo.findFirst({
      where: { id: equipamientoId, activoId },
      select: { id: true },
    });

    if (!equipamiento) {
      throw new NotFoundException(
        `Equipamiento ${equipamientoId} no encontrado`,
      );
    }
  }

  private toImagenDomain(record): ImagenActivo {
    return new ImagenActivo({
      ...record,
      tipoImagen: record.tipoImagen as TipoImagenActivo,
    });
  }

  private toEquipamientoDomain(record): EquipamientoActivo {
    return new EquipamientoActivo({
      ...record,
      estado: record.estado as EstadoEquipamientoActivo,
    });
  }
}
