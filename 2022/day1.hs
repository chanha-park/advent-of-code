{-# OPTIONS_GHC -Wall -Wextra #-}

-- https://adventofcode.com/2022/day/1

import Data.List (sortBy)
import Data.Ord (Down (..), comparing)
import System.IO (isEOF)

main :: IO ()
main = do
    answer <- solve [0, 0, 0]
    print . sum $ answer

solve :: [Int] -> IO [Int]
solve topThree = do
    localSum <- innerLoop 0
    if localSum == 0
        then return topThree
        else solve (take 3 . sortReverse $ localSum : topThree)

sortReverse :: [Int] -> [Int]
sortReverse = sortBy (comparing Down)

innerLoop :: Int -> IO Int
innerLoop acc = do
    done <- getSafeLine
    if done == ""
        then return acc
        else innerLoop (acc + read done)

getSafeLine :: IO String
getSafeLine = do
    done <- isEOF
    if done
        then return ""
        else getLine
