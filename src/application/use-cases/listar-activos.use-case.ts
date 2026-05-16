import { Inject, Injectable } from '@nestjs/common';
import { ListarActivosFiltroDto } from '../dto/listar-activos-filtro.dto';
import { ACTIVO_REPOSITORY } from '../../domain/repositories/activo.repository';
import type { ActivoRepository } from '../../domain/repositories/activo.repository';

@Injectable()
export class ListarActivosUseCase {
  constructor(
    @Inject(ACTIVO_REPOSITORY)
    private readonly activoRepository: ActivoRepository,
  ) {}

  execute(filters?: ListarActivosFiltroDto) {
    return this.activoRepository.findAll(filters);
  }
}
