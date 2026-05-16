import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import {
  EstadoActivo,
  EstadoCalibracion,
  EstadoOperativo,
  PlantillaInventario,
  TipoActivo,
} from '../../domain/aggregates/activo.aggregate';

export class ListarActivosFiltroDto {
  @ApiPropertyOptional({ example: 'ACT' })
  @IsOptional()
  @IsString()
  codigo?: string;

  @ApiPropertyOptional({ enum: TipoActivo, example: TipoActivo.VEHICULO })
  @IsOptional()
  @IsEnum(TipoActivo)
  tipoActivo?: TipoActivo;

  @ApiPropertyOptional({ enum: EstadoActivo, example: EstadoActivo.ACTIVO })
  @IsOptional()
  @IsEnum(EstadoActivo)
  estadoActivo?: EstadoActivo;

  @ApiPropertyOptional({
    enum: EstadoOperativo,
    example: EstadoOperativo.OPERATIVO,
  })
  @IsOptional()
  @IsEnum(EstadoOperativo)
  estadoOperativo?: EstadoOperativo;

  @ApiPropertyOptional({
    enum: EstadoCalibracion,
    example: EstadoCalibracion.PENDIENTE,
  })
  @IsOptional()
  @IsEnum(EstadoCalibracion)
  estadoCalibracion?: EstadoCalibracion;

  @ApiPropertyOptional({ example: 'BTZ' })
  @IsOptional()
  @IsString()
  placa?: string;

  @ApiPropertyOptional({
    enum: PlantillaInventario,
    example: PlantillaInventario.EQUIPO_LIVIANO,
  })
  @IsOptional()
  @IsEnum(PlantillaInventario)
  plantillaInventario?: PlantillaInventario;
}
