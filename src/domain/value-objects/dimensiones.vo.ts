export type DimensionesProps = {
  ancho?: number | null;
  longitud?: number | null;
  alto?: number | null;
};

export class Dimensiones {
  constructor(private readonly props: DimensionesProps) {
    for (const value of [props.ancho, props.longitud, props.alto]) {
      if (value !== undefined && value !== null && value <= 0) {
        throw new Error('Las dimensiones deben ser mayores a cero');
      }
    }
  }

  toPrimitives() {
    return { ...this.props };
  }
}
