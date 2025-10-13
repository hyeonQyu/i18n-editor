/**
 * Generates all nested paths of an object as a string union type.
 *
 * @example
 * type Paths = ObjectPaths<{ a: { b: string; c: number }; d: boolean }>
 * // "a" | "a.b" | "a.c" | "d"
 */
export type ObjectPaths<T, Depth extends number = 10> = [Depth] extends [never]
  ? never
  : T extends object
    ? {
        [K in keyof T]-?: K extends string | number ? `${K}` | `${K}.${ObjectPaths<T[K], Prev[Depth]>}` : never;
      }[keyof T]
    : never;

/**
 * Generates only the paths to leaf nodes of an object.
 *
 * @example
 * type LeafPaths = ObjectLeafPaths<{ a: { b: string; c: number }; d: boolean }>
 * // "a.b" | "a.c" | "d"
 */
export type ObjectLeafPaths<T, Depth extends number = 10> = [Depth] extends [never]
  ? never
  : T extends object
    ? {
        [K in keyof T]-?: K extends string | number ? (T[K] extends object ? `${K}.${ObjectLeafPaths<T[K], Prev[Depth]>}` : `${K}`) : never;
      }[keyof T]
    : never;

/**
 * Utility type for decreasing numbers (used for recursion depth limiting)
 */
type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ...0[]];

/**
 * Object path type with custom separator
 *
 * @example
 * type ColonPaths = ObjectPathsWithSeparator<{ a: { b: string } }, ":">
 * // "a" | "a:b"
 */
export type ObjectPathsWithSeparator<T, Sep extends string, Depth extends number = 10> = [Depth] extends [never]
  ? never
  : T extends object
    ? {
        [K in keyof T]-?: K extends string | number ? `${K}` | `${K}${Sep}${ObjectPathsWithSeparator<T[K], Sep, Prev[Depth]>}` : never;
      }[keyof T]
    : never;
