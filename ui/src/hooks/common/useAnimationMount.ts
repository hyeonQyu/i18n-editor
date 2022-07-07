import { useEffect, useState } from 'react';

export interface IUseAnimationMountParams {
    display: boolean;
    disappearAnimationDuration: number;
}

export interface IUseAnimationMount {
    mounted: boolean;
}

export default function useAnimationMount(params: IUseAnimationMountParams): IUseAnimationMount {
    const { display, disappearAnimationDuration } = params;

    const [mounted, setMounted] = useState(display);

    useEffect(() => {
        if (display) {
            setMounted(true);
            return;
        }

        setTimeout(() => {
            setMounted(false);
        }, disappearAnimationDuration * 1000);
    }, [display]);

    return {
        mounted,
    };
}
