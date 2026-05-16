import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import {
  EstadoDocumentoActivo,
  TipoDocumentoActivo,
} from '../../domain/entities/documento-activo.entity';

export class CrearDocumentoActivoDto {
  @ApiProperty({
    enum: TipoDocumentoActivo,
    example: TipoDocumentoActivo.SOAT,
  })
  @IsEnum(TipoDocumentoActivo)
  tipoDocumento!: TipoDocumentoActivo;

  @ApiPropertyOptional({
    enum: EstadoDocumentoActivo,
    example: EstadoDocumentoActivo.VIGENTE,
  })
  @IsOptional()
  @IsEnum(EstadoDocumentoActivo)
  estadoDocumento?: EstadoDocumentoActivo;

  @ApiPropertyOptional({ example: 'SOAT-2026-000123' })
  @IsOptional()
  @IsString()
  numero?: string;

  @ApiPropertyOptional({ example: '2026-01-01' })
  @IsOptional()
  @IsDateString()
  fechaEmision?: string;

  @ApiPropertyOptional({ example: '2026-12-31' })
  @IsOptional()
  @IsDateString()
  fechaVencimiento?: string;

  @ApiPropertyOptional({ example: 'https://storage.hagemsa.com/soat.pdf' })
  @IsOptional()
  @IsUrl({ require_tld: false })
  archivoUrl?: string;

  @ApiPropertyOptional({ example: 'Documento migrado desde sistema anterior' })
  @IsOptional()
  @IsString()
  observacion?: string;
}
