export function getRandomNumbers(): number[] {
    const result = [];
    for (let i = 0; i < 10; i++) {
        result.push(Math.floor(Math.random() * 10));
    }

    return result;
}
