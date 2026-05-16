import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ACTIVO_REPOSITORY } from '../../domain/repositories/activo.repository';
import type { ActivoRepository } from '../../domain/repositories/activo.repository';

@Injectable()
export class ObtenerActivoUseCase {
  constructor(
    @Inject(ACTIVO_REPOSITORY)
    private readonly activoRepository: ActivoRepository,
  ) {}

  async byId(id: string) {
    const activo = await this.activoRepository.findById(id);

    if (!activo) {
      throw new NotFoundException(`Activo ${id} no encontrado`);
    }

    return activo;
  }

  async byCodigo(codigo: string) {
    const activo = await this.activoRepository.findByCodigo(
      codigo.trim().toUpperCase(),
    );

    if (!activo) {
      throw new NotFoundException(`Activo con codigo ${codigo} no encontrado`);
    }

    return activo;
  }

  async byPlaca(placa: string) {
    const activo = await this.activoRepository.findByPlaca(
      placa.trim().toUpperCase(),
    );

    if (!activo) {
      throw new NotFoundException(`Activo con placa ${placa} no encontrado`);
    }

    return activo;
  }
}
