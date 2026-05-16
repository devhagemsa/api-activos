import { PartialType, OmitType } from '@nestjs/swagger';
import { CrearActivoDto } from './crear-activo.dto';

export class ActualizarActivoDto extends PartialType(
  OmitType(CrearActivoDto, ['codigo'] as const),
) {}
