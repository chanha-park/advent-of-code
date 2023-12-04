#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define SIZE 200

int
isPartNumber(int row, int col, char** engine, int digitLen) {
    for (int i = row - 1; i <= row + 1; ++i) {
        if (i < 0 || engine[i] == NULL) {
            continue;
        }
        for (int j = col - 1; j <= col + digitLen; ++j) {
            if (j < 0 || engine[i][j] == '\0') {
                continue;
            }
            if (engine[i][j] != '.' && !isdigit(engine[i][j])) {
                return 1;
            }
        }
    }
    return 0;
}

int
getDigitLen(char* str, int start) {
    int len = 0;
    while (str[start + len] != '\0' && isdigit(str[start + len])) {
        ++len;
    }
    return len;
}

int
getGearRatio(int row, int col, char** engine) {
    int countPartNumber = 0;
    int product = 1;
    for (int i = row - 1; i <= row + 1; ++i) {
        if (i < 0 || engine[i] == NULL) {
            continue;
        }
        for (int j = col - 1; j <= col + 1; ++j) {
            if (j < 0 || engine[i][j] == '\0') {
                continue;
            }
            if (!isdigit(engine[i][j])) {
                continue;
            }
            while (j > 0 && isdigit(engine[i][j - 1])) {
                --j;
            }
            product *= atoi(engine[i] + j);
            ++countPartNumber;
            j += getDigitLen(engine[i], j) - 1;
        }
    }
    return countPartNumber == 2 ? product : 0;
}

int
main(void) {
    char** engine;
    int lineNumber = 0;
    int sum = 0;

    engine = malloc(sizeof(char*) * SIZE);
    do {
        engine[lineNumber] = malloc(sizeof(char) * SIZE);
        if (scanf("%s", engine[lineNumber]) != 1) {
            free(engine[lineNumber]);
            engine[lineNumber] = NULL;
            break;
        }
        ++lineNumber;
    } while (1);

    int const width = strlen(engine[0]);
    int const height = lineNumber;

#ifndef PART2
    for (int i = 0; i < height; ++i) {
        for (int j = 0; j < width;) {
            if (isdigit(engine[i][j])) {
                int const digitLen = getDigitLen(engine[i], j);
                if (isPartNumber(i, j, engine, digitLen)) {
                    sum += atoi(engine[i] + j);
                }
                j += digitLen;
            } else {
                ++j;
            }
        }
    }
#else
    for (int i = 0; i < height; ++i) {
        for (int j = 0; j < width; ++j) {
            if (engine[i][j] == '*') {
                sum += getGearRatio(i, j, engine);
            }
        }
    }
#endif

    printf("%d\n", sum);
    return 0;
}
