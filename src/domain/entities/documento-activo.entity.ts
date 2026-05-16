export enum TipoDocumentoActivo {
  TARJETA_PROPIEDAD = 'TARJETA_PROPIEDAD',
  TARJETA_MERCANCIAS = 'TARJETA_MERCANCIAS',
  SOAT = 'SOAT',
  REVISION_TECNICA_12_MESES = 'REVISION_TECNICA_12_MESES',
  REVISION_TECNICA_6_MESES = 'REVISION_TECNICA_6_MESES',
  RESOLUCION_DIRECTORAL = 'RESOLUCION_DIRECTORAL',
  RESOLUCION_GERENCIAL = 'RESOLUCION_GERENCIAL',
  IQBF = 'IQBF',
  CERTIFICADO_MATPEL = 'CERTIFICADO_MATPEL',
  CERTIFICADO_BONIFICACION = 'CERTIFICADO_BONIFICACION',
  CERTIFICADO_OPERATIVIDAD = 'CERTIFICADO_OPERATIVIDAD',
  OTRO = 'OTRO',
}

export enum EstadoDocumentoActivo {
  VIGENTE = 'VIGENTE',
  VENCIDO = 'VENCIDO',
  PENDIENTE = 'PENDIENTE',
  OBSERVADO = 'OBSERVADO',
  NO_APLICA = 'NO_APLICA',
}

export type DocumentoActivoProps = {
  id: string;
  activoId: string;
  tipoDocumento: TipoDocumentoActivo;
  estadoDocumento: EstadoDocumentoActivo;
  numero?: string | null;
  fechaEmision?: Date | null;
  fechaVencimiento?: Date | null;
  archivoUrl?: string | null;
  observacion?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export class DocumentoActivo {
  constructor(private readonly props: DocumentoActivoProps) {}

  toPrimitives() {
    return { ...this.props };
  }
}
