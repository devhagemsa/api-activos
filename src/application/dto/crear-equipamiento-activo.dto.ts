import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { EstadoEquipamientoActivo } from '../../domain/entities/equipamiento-activo.entity';

export class CrearEquipamientoActivoDto {
  @ApiProperty({ example: 'Radio de comunicacion' })
  @IsString()
  nombre!: string;

  @ApiPropertyOptional({
    enum: EstadoEquipamientoActivo,
    example: EstadoEquipamientoActivo.INSTALADO,
  })
  @IsOptional()
  @IsEnum(EstadoEquipamientoActivo)
  estado?: EstadoEquipamientoActivo;

  @ApiPropertyOptional({ example: 'Equipo instalado en cabina' })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional({ example: 'Implementacion validada' })
  @IsOptional()
  @IsString()
  observacion?: string;
}
