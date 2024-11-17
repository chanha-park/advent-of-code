// type FindIndex<T extends ReadonlyArray<unknown>, V, Acc extends ReadonlyArray<unknown> = []> =
//                                         T extends [infer Head, ... infer Tail] ?
//                                                 Head extends ReadonlyArray<unknown> ? // Head가 배열 타입이면 한단계 더 재귀
//                                                         FindIndex<Head, V, []> extends infer K ?
//                                                                 // "hello"
//                                                                 K extends never ? "a" :
//                                                                 K extends ReadonlyArray<unknown> ? "b" :
//                                                                 "c"
//                                                         :
//                                                         never
//                                                 :
//                                                 Head extends V ? [Acc['length']] : // V 찾았으면 반환
//                                                 FindIndex<Tail, V, [...Acc, unknown]> // 아니면 Tail에서 찾기
//                                         :
//                                         never

type Forest0 = [
  ['x', 'x', 'x', 'x'],
  ['x', 'x', 'o', 'x'],
  ['x', 'x', 'x', 'x'],
  ['x', 'x', 'x', 'x'],
];

type test_0_actual = FindIndex<Forest0, 'o'>; // expected: [1, 2]

type Forest1 = ['x', 'x', 'x', 'o'];

type test_1_actual = FindIndex<Forest1, 'o'>;

type FindSanta<T extends Array<Array<unknown>>> = FindIndex<T, '🎅🏼'>;


type Foo<K> = K extends ReadonlyArray<unknown> ? [1, ... K] : false

type Bar = Foo<never>

type FindIndex<T extends ReadonlyArray<unknown>, V, Acc extends ReadonlyArray<unknown> = []> =
                   T extends [V, ... ReadonlyArray<unknown>] ? [Acc['length']] : // V 찾았으면 반환
                   T extends [infer Head, ... infer Tail] ?
                           Head extends ReadonlyArray<unknown> ? // Head가 배열 타입이면 한단계 더 재귀
                                   FindIndex<Head, V, []> extends infer K ?
                                           K extends never ? "a" : // 못찾았으면 Tail에서 찾기
                                           K extends ReadonlyArray<unknown> ? "b" : // 찾았으면 row, col 합쳐서 반환
                                           "c"
                                   :
                                   never
                           :
                           FindIndex<Tail, V, [...Acc, unknown]> // 아니면 Tail에서 찾기
                   :
                   never
