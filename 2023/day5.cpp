#include <cstdio>
#include <iostream>
#include <sstream>
#include <string>
#include <unordered_map>
#include <vector>

enum {
    SEED_TO_SOIL,
    SOIL_TO_FERT,
    FERT_TO_WATER,
    WATER_TO_LIGHT,
    LIGHT_TO_TEMPER,
    TEMPER_TO_HUM,
    HUM_TO_LOCA,
    NUMBER_OF_MAPS
};

int
main(void) {
    std::vector<int> seeds;
    std::unordered_map<int, int> maps[NUMBER_OF_MAPS];

    {
        char buff[200];
        scanf("seeds: %[^\n]", buff);
        std::stringstream ss(buff);
        while (!ss.eof()) {
            int n;
            ss >> n;
            seeds.push_back(n);
        }
    }
    std::cout << std::endl;
    {
        std::string line;
        std::getline(std::cin, line);
    }
    for (int i = 0; i < NUMBER_OF_MAPS; ++i) {
        std::string line;
        std::getline(std::cin, line);
        while (std::getline(std::cin, line) && line != "") {
            std::stringstream ss(line);
            int dst, src, range;
            ss >> dst >> src >> range;
            maps[i][src] = dst - src;
            maps[i][src + range];  // XXX
        }
    }
    return 0;
}
