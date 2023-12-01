#!/bin/bash

part1() {
    declare -i sum

    sum=0
    while IFS= read -r a; do
        a=${a//[a-z]/}
        sum+=${a:0:1}${a: -1}
    done
    echo $sum
}

part1
