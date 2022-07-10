import { useEffect } from 'react';

export interface IUseShortcutsParams {
    /** Ctrl + S */
    onCtrlS?: () => void;
}

export interface IUseShortcuts {}

export default function useShortcuts(params: IUseShortcutsParams): IUseShortcuts {
    const { onCtrlS } = params;

    useEffect(() => {
        const handleShortcuts = (e: KeyboardEvent) => {
            if (onCtrlS && e.key === 's' && e.ctrlKey) {
                e.preventDefault();
                onCtrlS();
                return false;
            }
        };

        document.addEventListener('keydown', handleShortcuts);
        return () => document.removeEventListener('keydown', handleShortcuts);
    }, [onCtrlS]);

    return {};
}
