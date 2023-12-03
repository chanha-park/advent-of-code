{-# LANGUAGE OverloadedRecordDot #-}
{-# OPTIONS_GHC -Wall -Wextra #-}

import Data.List qualified as L
import Data.Maybe qualified as M

data Round = Round
    { red :: Int
    , blue :: Int
    , green :: Int
    }

data Game = Game
    { getId :: Int
    , getRounds :: [Round]
    }

maxRedCubes :: Int
maxGreenCubes :: Int
maxBlueCubes :: Int
(maxRedCubes, maxGreenCubes, maxBlueCubes) = (12, 13, 14)

preFixLength :: Int
preFixLength = length "Game "

splitBy :: (Eq t) => t -> [t] -> [[t]]
splitBy delim str = do
    let delimIndex = L.elemIndex delim str
    case delimIndex of
        Nothing -> [str]
        Just idx -> firstChunk : splitBy delim (tail rest)
          where
            (firstChunk, rest) = L.splitAt idx str

(!!!) :: (Num a, Read a) => [[String]] -> Maybe Int -> a
xs !!! index = case index of
    Nothing -> 0
    Just idx -> read $ head (xs !! idx)

parseRound :: String -> Round
parseRound rounds = do
    let items = map words $ splitBy ',' rounds
    let redIndex = L.findIndex (\x -> last x == "red") items
    let greenIndex = L.findIndex (\x -> last x == "green") items
    let blueIndex = L.findIndex (\x -> last x == "blue") items
    Round
        { red = items !!! redIndex
        , green = items !!! greenIndex
        , blue = items !!! blueIndex
        }

parseGame :: String -> Game
parseGame line = do
    let colonIndex = M.fromJust $ L.elemIndex ':' line
    let (idPart, roundsPart) = L.splitAt colonIndex line
    Game
        { getId = read $ drop preFixLength idPart
        , getRounds = map parseRound $ splitBy ';' (tail roundsPart)
        }

isValidGame :: Game -> Bool
isValidGame game =
    all
        ( \r ->
            r.red
                <= maxRedCubes
                && r.green
                <= maxGreenCubes
                && r.blue
                <= maxBlueCubes
        )
        game.getRounds

getFewest :: [Round] -> Round
getFewest rounds =
    Round
        { red = maximum (map red rounds)
        , green = maximum (map green rounds)
        , blue = maximum (map blue rounds)
        }

getRoundPower :: Round -> Int
getRoundPower r = red r * green r * blue r

part1 :: String -> Int
part1 input = do
    let inputLines = L.lines input
    let games = map parseGame inputLines
    let filterdGames = filter isValidGame games
    sum $ map getId filterdGames

part2 :: String -> Int
part2 input = do
    let inputLines = L.lines input
    let games = map parseGame inputLines
    let powers = map (getRoundPower . getFewest . getRounds) games
    sum powers

main :: IO ()
main = do
    contents <- getContents
    print $ part1 contents
    print $ part2 contents
