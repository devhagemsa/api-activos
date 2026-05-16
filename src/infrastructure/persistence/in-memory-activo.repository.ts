import { Injectable } from '@nestjs/common';
import { Activo } from '../../domain/aggregates/activo.aggregate';
import {
  ActivoFilters,
  ActivoRepository,
} from '../../domain/repositories/activo.repository';

@Injectable()
export class InMemoryActivoRepository implements ActivoRepository {
  private readonly activos = new Map<string, Activo>();

  async save(activo: Activo): Promise<Activo> {
    this.activos.set(activo.toPrimitives().id, activo);
    return activo;
  }

  async findAll(filters?: ActivoFilters): Promise<Activo[]> {
    return [...this.activos.values()].filter((activo) => {
      const data = activo.toPrimitives();

      return (
        (!filters?.codigo ||
          data.codigo.includes(filters.codigo.trim().toUpperCase())) &&
        (!filters?.tipoActivo || data.tipoActivo === filters.tipoActivo) &&
        (!filters?.estadoActivo ||
          data.estadoActivo === filters.estadoActivo) &&
        (!filters?.estadoOperativo ||
          data.vehiculo?.estadoOperativo === filters.estadoOperativo) &&
        (!filters?.estadoCalibracion ||
          data.vehiculo?.estadoCalibracion === filters.estadoCalibracion) &&
        (!filters?.placa ||
          data.vehiculo?.placaRodaje
            ?.toUpperCase()
            .includes(filters.placa.trim().toUpperCase())) &&
        (!filters?.plantillaInventario ||
          data.vehiculo?.plantillaInventario === filters.plantillaInventario)
      );
    });
  }

  async findById(id: string): Promise<Activo | null> {
    return this.activos.get(id) ?? null;
  }

  async findByCodigo(codigo: string): Promise<Activo | null> {
    const normalizedCodigo = codigo.trim().toUpperCase();

    return (
      [...this.activos.values()].find(
        (activo) => activo.toPrimitives().codigo === normalizedCodigo,
      ) ?? null
    );
  }

  async findByPlaca(placa: string): Promise<Activo | null> {
    const normalizedPlaca = placa.trim().toUpperCase();

    return (
      [...this.activos.values()].find(
        (activo) =>
          activo.toPrimitives().vehiculo?.placaRodaje === normalizedPlaca,
      ) ?? null
    );
  }
}
