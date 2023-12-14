type Reverse<T extends string> = T extends "" ? "" :
                                 T extends `${infer Head extends string}${infer Tail extends string}` ? `${Reverse<Tail>}${Head}` :
                                 never;
