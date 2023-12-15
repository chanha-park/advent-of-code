type BoxToys<T extends string, U extends number, Acc extends ReadonlyArray<unknown> = []> = U extends Acc["length"] ? Acc :
                                                                                            BoxToys<T, U, [... Acc, T]>;
