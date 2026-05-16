export class CodigoActivo {
  private constructor(private readonly value: string) {}

  static create(value: string) {
    const normalized = value.trim().toUpperCase();

    if (!normalized) {
      throw new Error('Codigo de activo requerido');
    }

    return new CodigoActivo(normalized);
  }

  toString() {
    return this.value;
  }
}
