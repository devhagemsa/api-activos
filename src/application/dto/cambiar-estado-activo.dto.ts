import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { EstadoActivo } from '../../domain/aggregates/activo.aggregate';

export class CambiarEstadoActivoDto {
  @ApiProperty({ enum: EstadoActivo, example: EstadoActivo.INACTIVO })
  @IsEnum(EstadoActivo)
  estadoActivo: EstadoActivo;

  @ApiPropertyOptional({ example: 'Retiro temporal por decision operativa' })
  @IsOptional()
  @IsString()
  motivo?: string;

  @ApiPropertyOptional({ example: 'admin.activos' })
  @IsOptional()
  @IsString()
  usuario?: string;
}
