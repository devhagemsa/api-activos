import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EstadoEquipamientoActivo } from '../../domain/entities/equipamiento-activo.entity';

export class EquipamientoActivoResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  activoId!: string;

  @ApiProperty()
  nombre!: string;

  @ApiProperty({ enum: EstadoEquipamientoActivo })
  estado!: EstadoEquipamientoActivo;

  @ApiPropertyOptional({ nullable: true })
  descripcion!: string | null;

  @ApiPropertyOptional({ nullable: true })
  observacion!: string | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
