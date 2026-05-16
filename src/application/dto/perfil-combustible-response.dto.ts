import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  EstadoActivo,
  EstadoCalibracion,
} from '../../domain/aggregates/activo.aggregate';

export class PerfilCombustibleResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty({ example: 'ACT-000863' })
  codigo!: string;

  @ApiPropertyOptional({ example: 'BTZ-750', nullable: true })
  placaRodaje!: string | null;

  @ApiPropertyOptional({ example: 21, nullable: true })
  capacidadTanqueGalones!: number | null;

  @ApiProperty({ enum: EstadoCalibracion })
  estadoCalibracion!: EstadoCalibracion;

  @ApiPropertyOptional({ example: 1.08, nullable: true })
  factorCorreccion!: number | null;

  @ApiProperty({ enum: EstadoActivo })
  estadoActivo!: EstadoActivo;
}
