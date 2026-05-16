import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  EstadoActivo,
  TipoActivo,
} from '../../domain/aggregates/activo.aggregate';
import type { VehiculoDetalleProps } from '../../domain/aggregates/activo.aggregate';
import { VehiculoDetalleDto } from './vehiculo-detalle.dto';

export class ActivoResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty({ example: 'ACT-000863' })
  codigo!: string;

  @ApiProperty({ enum: TipoActivo })
  tipoActivo!: TipoActivo;

  @ApiProperty()
  descripcion!: string;

  @ApiProperty()
  ubicacion!: string;

  @ApiProperty({ enum: EstadoActivo })
  estadoActivo!: EstadoActivo;

  @ApiPropertyOptional({ nullable: true })
  observacion!: string | null;

  @ApiPropertyOptional({ type: VehiculoDetalleDto, nullable: true })
  vehiculo!: VehiculoDetalleProps | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
