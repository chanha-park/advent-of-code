type DefaultPresents = ['🛹', '🚲', '🛴', '🏄'];

type Presents = DefaultPresents[number];
type Roate<T extends ReadonlyArray<unknown>> = T extends [infer Head, ... infer Tail] ? [... Tail, Head] :
                                               T;

type Rebuild<T extends ReadonlyArray<number>, U extends ReadonlyArray<Presents> = DefaultPresents, Acc extends ReadonlyArray<Presents> = []> =
                T extends [infer Head, ... infer Tail extends ReadonlyArray<number>] ?
                                Acc['length'] extends Head ? [... Acc, ... Rebuild<Tail, Roate<U>, []>] :
                                Rebuild<T, U, [... Acc, U[0]]>
                :
                Acc;
