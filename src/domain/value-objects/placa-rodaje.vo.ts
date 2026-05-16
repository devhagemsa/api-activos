export class PlacaRodaje {
  private constructor(private readonly value: string) {}

  static create(value: string) {
    const normalized = value.trim().toUpperCase();

    if (!normalized) {
      throw new Error('Placa de rodaje requerida');
    }

    return new PlacaRodaje(normalized);
  }

  toString() {
    return this.value;
  }
}
