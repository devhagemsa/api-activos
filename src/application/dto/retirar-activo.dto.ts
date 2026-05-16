import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class RetirarActivoDto {
  @ApiPropertyOptional({ example: 'Unidad retirada por renovacion de flota' })
  @IsString()
  @IsOptional()
  observacion?: string;
}
