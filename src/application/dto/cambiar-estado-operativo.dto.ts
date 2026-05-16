import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { EstadoOperativo } from '../../domain/aggregates/activo.aggregate';

export class CambiarEstadoOperativoDto {
  @ApiProperty({
    enum: EstadoOperativo,
    example: EstadoOperativo.MANTENIMIENTO,
  })
  @IsEnum(EstadoOperativo)
  estadoOperativo!: EstadoOperativo;

  @ApiPropertyOptional({ example: 'Unidad enviada a mantenimiento preventivo' })
  @IsOptional()
  @IsString()
  motivo?: string;

  @ApiPropertyOptional({ example: 'jefe.flota' })
  @IsOptional()
  @IsString()
  usuario?: string;
}
