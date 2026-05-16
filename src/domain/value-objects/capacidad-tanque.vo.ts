export class CapacidadTanque {
  constructor(private readonly value: number) {
    if (value <= 0) {
      throw new Error('La capacidad del tanque debe ser mayor a cero');
    }
  }

  toNumber() {
    return this.value;
  }
}
