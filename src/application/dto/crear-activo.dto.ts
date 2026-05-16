import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  EstadoActivo,
  TipoActivo,
} from '../../domain/aggregates/activo.aggregate';
import { VehiculoDetalleDto } from './vehiculo-detalle.dto';

export class CrearActivoDto {
  @ApiProperty({ example: 'ACT-000863' })
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @ApiProperty({ enum: TipoActivo, example: TipoActivo.VEHICULO })
  @IsEnum(TipoActivo)
  tipoActivo: TipoActivo;

  @ApiProperty({ example: 'Camioneta Toyota Hilux BTZ-750' })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty({ example: 'Arequipa - Base principal' })
  @IsString()
  @IsNotEmpty()
  ubicacion: string;

  @ApiProperty({ enum: EstadoActivo, example: EstadoActivo.ACTIVO })
  @IsEnum(EstadoActivo)
  estadoActivo: EstadoActivo;

  @ApiPropertyOptional({ example: 'Implementacion inicial desde inventario anterior' })
  @IsString()
  @IsOptional()
  observacion?: string;

  @ApiPropertyOptional({ type: VehiculoDetalleDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => VehiculoDetalleDto)
  vehiculo?: VehiculoDetalleDto;
}
