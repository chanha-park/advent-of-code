type SantaListProtector<T> = T extends number | string | boolean | Function ? T :
                             { readonly [K in keyof T]: SantaListProtector<T[K]>; };
