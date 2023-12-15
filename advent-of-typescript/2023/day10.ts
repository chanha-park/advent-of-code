type StreetSuffixTester<T extends string, U extends string> = T extends `${infer _Front extends string}${U}` ? true :
                                                              false
