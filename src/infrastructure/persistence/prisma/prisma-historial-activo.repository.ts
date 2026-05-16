import { Injectable } from '@nestjs/common';
import { ActivoHistorial } from '../../../domain/entities/activo-historial.entity';
import {
  HistorialActivoRepository,
  RegistrarHistorialActivoParams,
} from '../../../domain/repositories/historial-activo.repository';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaHistorialActivoRepository
  implements HistorialActivoRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async registrar(
    params: RegistrarHistorialActivoParams,
  ): Promise<ActivoHistorial> {
    const historial = await this.prisma.activoHistorial.create({
      data: params,
    });

    return new ActivoHistorial(historial);
  }
}
