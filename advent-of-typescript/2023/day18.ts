type Count<T extends ReadonlyArray<unknown>, U, Acc extends ReadonlyArray<unknown> = []> =
                T extends [U, ... infer Tail] ? Count<Tail, U, [... Acc, unknown]> :
                T extends [unknown, ... infer Tail] ? Count<Tail, U, Acc> :
                Acc['length']
