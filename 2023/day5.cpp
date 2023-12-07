#include <algorithm>
#include <cstdio>
#include <iostream>
#include <map>
#include <optional>
#include <sstream>
#include <string>
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
    std::vector<long long> seeds;
    std::map<long long, long long> maps[NUMBER_OF_MAPS];

    {
        char buff[1000];
        scanf("seeds: %[^\n]", buff);
        std::stringstream ss(buff);
        while (!ss.eof()) {
            long long n;
            ss >> n;
            seeds.push_back(n);
        }
    }

    {
        std::string line;
        std::getline(std::cin, line);
    }

    for (int i = 0; i < NUMBER_OF_MAPS; ++i) {
        std::string line;
        std::getline(std::cin, line);
        while (std::getline(std::cin, line) && line != "") {
            std::stringstream ss(line);
            long long dst, src, range;
            ss >> dst >> src >> range;
            maps[i][src] = dst - src;
            maps[i][src + range];  // XXX
        }
    }

    long long min_location = -1;

    auto const& convert = [&maps, &min_location](long long curr) {
        for (int i = 0; i < NUMBER_OF_MAPS; ++i) {
            std::map<long long, long long> const& map = maps[i];
            auto it = map.upper_bound(curr);
            if (it != map.cbegin()) {
                --it;
                curr += it->second;
            }
        }
        min_location
            = (min_location > curr || min_location == -1) ? curr : min_location;
    };

    for (auto const seed : seeds) {
        convert(seed);
    }
    std::cout << min_location << std::endl;

    return 0;
}
