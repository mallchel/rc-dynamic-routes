const cache = new (WeakMap || Map)();

export const memoize = (fn: Function) => {
    const _memoize = (...args: any) => {
        const cachedValue = cache.get(args);

        if (cachedValue) {
            return cachedValue;
        }

        const result = fn(...args);

        cache.set(args, result);
        return result;
    };

    return _memoize;
};
