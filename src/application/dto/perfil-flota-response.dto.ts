import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EstadoOperativo } from '../../domain/aggregates/activo.aggregate';

export class PerfilFlotaResponseDto {
  @ApiPropertyOptional({ example: 'BTZ-750', nullable: true })
  placaRodaje!: string | null;

  @ApiPropertyOptional({ example: 'HILUX', nullable: true })
  modelo!: string | null;

  @ApiPropertyOptional({ example: 'PICK UP', nullable: true })
  carroceria!: string | null;

  @ApiProperty({ enum: EstadoOperativo })
  estadoOperativo!: EstadoOperativo;

  @ApiPropertyOptional({ example: 2, nullable: true })
  ejes!: number | null;
}
