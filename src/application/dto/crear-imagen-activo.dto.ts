import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, IsUrl, Min } from 'class-validator';
import { TipoImagenActivo } from '../../domain/entities/imagen-activo.entity';

export class CrearImagenActivoDto {
  @ApiProperty({ enum: TipoImagenActivo, example: TipoImagenActivo.FRONTAL })
  @IsEnum(TipoImagenActivo)
  tipoImagen!: TipoImagenActivo;

  @ApiProperty({ example: 'https://storage.hagemsa.com/activos/ACT-001/frontal.jpg' })
  @IsUrl({ require_tld: false })
  url!: string;

  @ApiPropertyOptional({ example: 'Vista frontal de la unidad' })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(0)
  orden?: number;
}
