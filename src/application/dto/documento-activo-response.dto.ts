import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  EstadoDocumentoActivo,
  TipoDocumentoActivo,
} from '../../domain/entities/documento-activo.entity';

export class DocumentoActivoResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  activoId!: string;

  @ApiProperty({ enum: TipoDocumentoActivo })
  tipoDocumento!: TipoDocumentoActivo;

  @ApiProperty({ enum: EstadoDocumentoActivo })
  estadoDocumento!: EstadoDocumentoActivo;

  @ApiPropertyOptional({ nullable: true })
  numero!: string | null;

  @ApiPropertyOptional({ nullable: true })
  fechaEmision!: Date | null;

  @ApiPropertyOptional({ nullable: true })
  fechaVencimiento!: Date | null;

  @ApiPropertyOptional({ nullable: true })
  archivoUrl!: string | null;

  @ApiPropertyOptional({ nullable: true })
  observacion!: string | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
