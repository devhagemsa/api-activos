import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import {
  EstadoCalibracion,
  EstadoOperativo,
  PlantillaInventario,
} from '../../domain/aggregates/activo.aggregate';

export class VehiculoDetalleDto {
  @ApiProperty({
    enum: PlantillaInventario,
    example: PlantillaInventario.EQUIPO_LIVIANO,
  })
  @IsEnum(PlantillaInventario)
  plantillaInventario!: PlantillaInventario;

  @ApiPropertyOptional({ example: 'ELECTRONICA' })
  @IsOptional()
  @IsString()
  tarjetaPropiedad?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tarjetaMercancias?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  soat?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  revisionTecnica12Meses?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  revisionTecnica6Meses?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  resolucionDirectoral?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  resolucionGerencial?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  iqbf?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  certificadoMatpel?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  certificadoBonificacion?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  certificadoOperatividad?: string;

  @ApiPropertyOptional({ example: 'BTZ-750' })
  @IsOptional()
  @IsString()
  placaRodaje?: string;

  @ApiPropertyOptional({ example: 2023 })
  @IsOptional()
  @IsInt()
  @Min(1900)
  anioFabricacion?: number;

  @ApiPropertyOptional({ example: 'BLANCO' })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiPropertyOptional({ example: 'TOYOTA' })
  @IsOptional()
  @IsString()
  marca?: string;

  @ApiPropertyOptional({ example: 'HILUX' })
  @IsOptional()
  @IsString()
  modelo?: string;

  @ApiPropertyOptional({ example: 'PICK UP' })
  @IsOptional()
  @IsString()
  carroceria?: string;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsInt()
  ejes?: number;

  @ApiPropertyOptional({ example: 'N1' })
  @IsOptional()
  @IsString()
  categoria?: string;

  @ApiPropertyOptional({ example: '8AJKA3CD7P3108239' })
  @IsOptional()
  @IsString()
  serieChasis?: string;

  @ApiPropertyOptional({ example: '1GDG366863' })
  @IsOptional()
  @IsString()
  serieMotor?: string;

  @ApiPropertyOptional({ example: 'IMPLEMENTACION' })
  @IsOptional()
  @IsString()
  radioComunicacion?: string;

  @ApiPropertyOptional({ example: 'SI // PANTALLA' })
  @IsOptional()
  @IsString()
  autorradio?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  llantasRepuesto?: string;

  @ApiPropertyOptional({ example: 'IMPLEMENTACION' })
  @IsOptional()
  @IsString()
  camara?: string;

  @ApiPropertyOptional({ example: 'IMPLEMENTACION' })
  @IsOptional()
  @IsString()
  tablet?: string;

  @ApiPropertyOptional({ example: 'IMPLEMENTACION' })
  @IsOptional()
  @IsString()
  dispositivosSeguridad?: string;

  @ApiPropertyOptional({
    enum: EstadoOperativo,
    example: EstadoOperativo.OPERATIVO,
  })
  @IsOptional()
  @IsEnum(EstadoOperativo)
  estadoOperativo?: EstadoOperativo;

  @ApiPropertyOptional({ example: 'IMPLEMENTACION' })
  @IsOptional()
  @IsString()
  cajaHerramientas?: string;

  @ApiPropertyOptional({ example: 'IMPLEMENTACION' })
  @IsOptional()
  @IsString()
  jaulaAntivuelco?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  carriboy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  baranda?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  mamparon?: string;

  @ApiPropertyOptional({ example: 1.855 })
  @IsOptional()
  @IsNumber()
  ancho?: number;

  @ApiPropertyOptional({ example: 5.325 })
  @IsOptional()
  @IsNumber()
  longitud?: number;

  @ApiPropertyOptional({ example: 1.815 })
  @IsOptional()
  @IsNumber()
  alto?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tipoSuspension?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tipoTornamesa?: string;

  @ApiPropertyOptional({ example: 21 })
  @IsOptional()
  @IsNumber()
  capacidadTanqueGalones?: number;

  @ApiPropertyOptional({
    enum: EstadoCalibracion,
    example: EstadoCalibracion.NO_CALIBRADA,
  })
  @IsOptional()
  @IsEnum(EstadoCalibracion)
  estadoCalibracion?: EstadoCalibracion;

  @ApiPropertyOptional({ example: 1.08 })
  @IsOptional()
  @IsNumber()
  factorCorreccion?: number;
}
