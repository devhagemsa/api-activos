import { PartialType } from '@nestjs/swagger';
import { CrearEquipamientoActivoDto } from './crear-equipamiento-activo.dto';

export class ActualizarEquipamientoActivoDto extends PartialType(
  CrearEquipamientoActivoDto,
) {}
