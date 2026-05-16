import { ActivoHistorial } from '../entities/activo-historial.entity';

export const HISTORIAL_ACTIVO_REPOSITORY = Symbol(
  'HISTORIAL_ACTIVO_REPOSITORY',
);

export type RegistrarHistorialActivoParams = {
  activoId: string;
  tipoCambio: string;
  valorAnterior?: string | null;
  valorNuevo?: string | null;
  motivo?: string | null;
  usuario?: string | null;
};

export interface HistorialActivoRepository {
  registrar(params: RegistrarHistorialActivoParams): Promise<ActivoHistorial>;
}
