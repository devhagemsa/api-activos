import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { EstadoCalibracion } from '../../domain/aggregates/activo.aggregate';

export class CambiarEstadoCalibracionDto {
  @ApiProperty({
    enum: EstadoCalibracion,
    example: EstadoCalibracion.NO_CALIBRADA,
  })
  @IsEnum(EstadoCalibracion)
  estadoCalibracion: EstadoCalibracion;

  @ApiPropertyOptional({ example: 1.08 })
  @IsOptional()
  @IsNumber()
  factorCorreccion?: number;

  @ApiPropertyOptional({ example: 'Calibracion pendiente de validacion' })
  @IsOptional()
  @IsString()
  motivo?: string;

  @ApiPropertyOptional({ example: 'analista.combustible' })
  @IsOptional()
  @IsString()
  usuario?: string;
}
