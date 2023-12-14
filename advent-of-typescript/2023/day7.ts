type AppendGood<T> = {
    [K in string & keyof T as `good_${K}`]: T[K]
};
