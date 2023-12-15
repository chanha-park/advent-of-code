type Succ<N extends number, Acc extends ReadonlyArray<unknown> = []> = [... Acc, unknown] extends [... infer Next] ?
                                                                            Acc['length'] extends N ? Next['length'] :
                                                                            Succ<N, Next>
                                                                        :
                                                                        never

// make array of length T
type Fill<T extends number, Acc extends ReadonlyArray<unknown> = []> = T extends Acc["length"] ? Acc :
                                                                       Fill<T, [...Acc, unknown]>;

type IsGreater<A extends number, B extends number> = Fill<A> extends [... infer FillA] ?
                                                        Fill<B> extends [... infer _, ... FillA] ? false :
                                                        true
                                                  :
                                                  never

type DayCounter<Start extends number, End extends number, Acc = never> = IsGreater<Start, End> extends true ? never :
                                                                         Start extends End ? Acc | End :
                                                                         DayCounter<Succ<Start>, End, Start | Acc>
