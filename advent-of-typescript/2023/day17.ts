type RockPaperScissors = '👊🏻' | '🖐🏾' | '✌🏽';

type WhoWins<T extends RockPaperScissors, U extends RockPaperScissors> = T extends U ? "draw" :
                                                                         [T, U] extends ['👊🏻', '🖐🏾'] ? "win" :
                                                                         [T, U] extends ['🖐🏾', '✌🏽'] ? "win" :
                                                                         [T, U] extends ['✌🏽', '👊🏻'] ? "win" :
                                                                         "lose"
