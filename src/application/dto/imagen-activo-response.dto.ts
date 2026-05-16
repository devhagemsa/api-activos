import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TipoImagenActivo } from '../../domain/entities/imagen-activo.entity';

export class ImagenActivoResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  activoId!: string;

  @ApiProperty({ enum: TipoImagenActivo })
  tipoImagen!: TipoImagenActivo;

  @ApiProperty()
  url!: string;

  @ApiPropertyOptional({ nullable: true })
  descripcion!: string | null;

  @ApiProperty()
  orden!: number;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
