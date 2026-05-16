export enum TipoImagenActivo {
  FRONTAL = 'FRONTAL',
  LATERAL = 'LATERAL',
  POSTERIOR = 'POSTERIOR',
  INTERIOR = 'INTERIOR',
  DOCUMENTO = 'DOCUMENTO',
  OTRO = 'OTRO',
}

export type ImagenActivoProps = {
  id: string;
  activoId: string;
  tipoImagen: TipoImagenActivo;
  url: string;
  descripcion?: string | null;
  orden: number;
  createdAt: Date;
  updatedAt: Date;
};

export class ImagenActivo {
  constructor(private readonly props: ImagenActivoProps) {}

  toPrimitives() {
    return { ...this.props };
  }
}
