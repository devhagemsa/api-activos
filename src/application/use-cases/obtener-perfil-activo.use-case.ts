import { Injectable } from '@nestjs/common';
import { PerfilCombustibleResponseDto } from '../dto/perfil-combustible-response.dto';
import { PerfilFlotaResponseDto } from '../dto/perfil-flota-response.dto';
import {
  EstadoCalibracion,
  EstadoOperativo,
} from '../../domain/aggregates/activo.aggregate';
import { ObtenerActivoUseCase } from './obtener-activo.use-case';

@Injectable()
export class ObtenerPerfilActivoUseCase {
  constructor(private readonly obtenerActivoUseCase: ObtenerActivoUseCase) {}

  async flotaPorId(id: string): Promise<PerfilFlotaResponseDto> {
    return this.toPerfilFlota(await this.obtenerActivoUseCase.byId(id));
  }

  async flotaPorCodigo(codigo: string): Promise<PerfilFlotaResponseDto> {
    return this.toPerfilFlota(await this.obtenerActivoUseCase.byCodigo(codigo));
  }

  async flotaPorPlaca(placa: string): Promise<PerfilFlotaResponseDto> {
    return this.toPerfilFlota(await this.obtenerActivoUseCase.byPlaca(placa));
  }

  async combustiblePorId(id: string): Promise<PerfilCombustibleResponseDto> {
    return this.toPerfilCombustible(await this.obtenerActivoUseCase.byId(id));
  }

  async combustiblePorCodigo(
    codigo: string,
  ): Promise<PerfilCombustibleResponseDto> {
    return this.toPerfilCombustible(
      await this.obtenerActivoUseCase.byCodigo(codigo),
    );
  }

  private toPerfilFlota(activo): PerfilFlotaResponseDto {
    const data = activo.toPrimitives();

    return {
      placaRodaje: data.vehiculo?.placaRodaje ?? null,
      modelo: data.vehiculo?.modelo ?? null,
      carroceria: data.vehiculo?.carroceria ?? null,
      estadoOperativo:
        data.vehiculo?.estadoOperativo ?? EstadoOperativo.OPERATIVO,
      ejes: data.vehiculo?.ejes ?? null,
    };
  }

  private toPerfilCombustible(activo): PerfilCombustibleResponseDto {
    const data = activo.toPrimitives();

    return {
      id: data.id,
      codigo: data.codigo,
      placaRodaje: data.vehiculo?.placaRodaje ?? null,
      capacidadTanqueGalones:
        data.vehiculo?.capacidadTanqueGalones ?? null,
      estadoCalibracion:
        data.vehiculo?.estadoCalibracion ?? EstadoCalibracion.PENDIENTE,
      factorCorreccion: data.vehiculo?.factorCorreccion ?? null,
      estadoActivo: data.estadoActivo,
    };
  }
}
