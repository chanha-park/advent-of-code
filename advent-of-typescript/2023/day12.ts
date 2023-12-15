type FindIndex<T extends ReadonlyArray<unknown>, V, Acc extends ReadonlyArray<unknown> = []> =
                                        T extends [V, ... ReadonlyArray<unknown>] ? Acc['length'] :
                                        T extends [unknown, ... infer Tail] ? FindIndex<Tail, V, [...Acc, unknown]> :
                                        never

type FindSanta<T extends Array<unknown>> = FindIndex<T, '🎅🏼'>;
