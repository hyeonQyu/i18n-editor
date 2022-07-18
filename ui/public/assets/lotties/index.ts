export const LOTTIES = ['getConfig'] as const;
export type Lottie = typeof LOTTIES[number];

export const assetLottie: {
    [key in Lottie]?: any;
} = (() => {
    return LOTTIES.reduce((acc, lottie) => ({ ...acc, [lottie]: require(`./${lottie}.json`) }), {});
})();
