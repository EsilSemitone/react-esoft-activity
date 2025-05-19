class Car {
  mileage: number = 0;

  constructor(
    private make: string,
    private model: string,
    private year: number
  ) {}

  drive(distance: number): void {
    this.mileage += distance;
  }

  getDescription(): string {
    return `Машина: ${this.make}, модель: ${this.model}, год выпуска: ${this.year}, проехала: ${this.mileage}`;
  }
}
