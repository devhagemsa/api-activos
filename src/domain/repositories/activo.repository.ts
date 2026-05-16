import { Activo } from '../aggregates/activo.aggregate';
import type {
  EstadoActivo,
  EstadoCalibracion,
  EstadoOperativo,
  PlantillaInventario,
  TipoActivo,
} from '../aggregates/activo.aggregate';

export const ACTIVO_REPOSITORY = Symbol('ACTIVO_REPOSITORY');

export type ActivoFilters = {
  codigo?: string;
  tipoActivo?: TipoActivo;
  estadoActivo?: EstadoActivo;
  estadoOperativo?: EstadoOperativo;
  estadoCalibracion?: EstadoCalibracion;
  placa?: string;
  plantillaInventario?: PlantillaInventario;
};

export interface ActivoRepository {
  save(activo: Activo): Promise<Activo>;
  findAll(filters?: ActivoFilters): Promise<Activo[]>;
  findById(id: string): Promise<Activo | null>;
  findByCodigo(codigo: string): Promise<Activo | null>;
  findByPlaca(placa: string): Promise<Activo | null>;
}
