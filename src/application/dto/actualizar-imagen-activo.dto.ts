import { PartialType } from '@nestjs/swagger';
import { CrearImagenActivoDto } from './crear-imagen-activo.dto';

export class ActualizarImagenActivoDto extends PartialType(
  CrearImagenActivoDto,
) {}
