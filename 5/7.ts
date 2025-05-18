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
    return `Марка: ${this.make},\nМодель: ${this.model},\nГод создания: ${this.year},\nПробег: ${this.mileage}`;
  }
}
