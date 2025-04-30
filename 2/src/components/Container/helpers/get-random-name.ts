const NAMES = ['Артём', 'Мария', 'Иван', 'Ольга', 'Даниил', 'София', 'Алексей', 'Анастасия', 'Максим', 'Екатерина'];

export function getRandomName(): string {
    const index = Math.floor(Math.random() * NAMES.length);
    return NAMES[index];
}
