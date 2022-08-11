export function getRandomNumber(from = 0, to = 100000) {
    return Math.round(from + Math.random() * to);
}
