import { PartialType } from '@nestjs/swagger';
import { CrearDocumentoActivoDto } from './crear-documento-activo.dto';

export class ActualizarDocumentoActivoDto extends PartialType(
  CrearDocumentoActivoDto,
) {}
