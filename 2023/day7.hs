{-# OPTIONS_GHC -Wall -Wextra #-}

-- https://jalammar.github.io/visual-interactive-guide-basics-neural-networks/

data HandType
    = HighCard
    | OnePair
    | TwoPair
    | Triple
    | FullHouse
    | FourCards
    | FiveCards
    deriving (Eq, Ord, Enum)

type Card = String

data Hand = Hand HandType Card

data HandBid = HandBid {getHand :: Hand, getBid :: Int}

parseHand :: String -> Maybe Hand
parseHand line = do
    [cards, bid] <- Just $ words line
    return (Hand OnePair "hi")

main :: IO ()
main = do
    contents <- getContents
    hands <- Just $ sequence $ map parseHand $ lines contents
    return ()

-- part1 :: [Hand] -> Int
-- part1 hands = error []
--
-- part2 :: [Hand] -> Int
-- part2 hands = error []

-- print $ part1 hands
-- print $ part2 hands
