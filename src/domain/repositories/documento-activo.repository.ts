import { DocumentoActivo } from '../entities/documento-activo.entity';
import type {
  EstadoDocumentoActivo,
  TipoDocumentoActivo,
} from '../entities/documento-activo.entity';

export const DOCUMENTO_ACTIVO_REPOSITORY = Symbol(
  'DOCUMENTO_ACTIVO_REPOSITORY',
);

export type CrearDocumentoActivoParams = {
  activoId: string;
  tipoDocumento: TipoDocumentoActivo;
  estadoDocumento: EstadoDocumentoActivo;
  numero?: string | null;
  fechaEmision?: Date | null;
  fechaVencimiento?: Date | null;
  archivoUrl?: string | null;
  observacion?: string | null;
};

export type ActualizarDocumentoActivoParams = Partial<
  Omit<CrearDocumentoActivoParams, 'activoId'>
>;

export interface DocumentoActivoRepository {
  findByActivoId(activoId: string): Promise<DocumentoActivo[]>;
  create(params: CrearDocumentoActivoParams): Promise<DocumentoActivo>;
  update(
    id: string,
    params: ActualizarDocumentoActivoParams,
  ): Promise<DocumentoActivo>;
  existsForActivo(activoId: string, id: string): Promise<boolean>;
}
