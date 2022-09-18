import { KeyValuePair } from '@defines/common/keyValuePair';

class KeyValueSet<K extends string | number, V> {
    private _map: Map<K, KeyValuePair<K, V>> = new Map();

    get size(): number {
        return this._map.size;
    }

    [Symbol.iterator]() {
        return this._map.values();
    }

    constructor(values?: KeyValuePair<K, V>[] | null) {
        values?.forEach(({ key, value }) => {
            this._map.set(key, { key, value });
        });
    }

    add(element: KeyValuePair<K, V>): this {
        this._map.set(element.key, element);
        return this;
    }

    clear(): void {
        this._map = new Map();
    }

    delete(element: KeyValuePair<K, V>): boolean {
        return this._map.delete(element.key);
    }

    has(element: KeyValuePair<K, V>): boolean {
        return this._map.has(element.key);
    }
}

export default KeyValueSet;
