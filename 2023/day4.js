const fs = require("fs")

const input = fs
                .readFileSync("/dev/stdin")
                .toString()
                .split("\n")
                .filter((line) => line.length > 0)

const games = input
                .map((line) => line.split(":")[1])
                .map((line) => line.split("|"))

const part1 = games
                .map(([first, second]) => {
                    const winningNumbers = first.trim().split(/\s+/).map((x) => Number(x));
                    const numbersIHave = second.trim().split(/\s+/).map((x) => Number(x));
                    const matches = numbersIHave.filter((n) => winningNumbers.includes(n)).length
                    return matches > 0 ? 2 ** (matches - 1) : 0;
                })
                .reduce((acc, x) => acc + x, 0);

const numberOfMatches = games
                .map(([first, second]) => {
                    const winningNumbers = first.trim().split(/\s+/).map((x) => Number(x));
                    const numbersIHave = second.trim().split(/\s+/).map((x) => Number(x));
                    const matches = numbersIHave.filter((n) => winningNumbers.includes(n)).length
                    return matches
                })

const answer = Array(games.length).fill(1)
for (let i = 0; i < answer.length; ++i) {
    for (let j = i + 1; j <= i + numberOfMatches[i] && j < answer.length; ++j) {
        answer[j] += answer[i];
    }
}

const part2 = answer.reduce((acc, x) => acc + x, 0);

console.log(part1);
console.log(part2);
