import { ALERT_TYPES, AlertType } from '@components/common/alert/defines/alertDefines';

export const assetAlert: {
    [key in AlertType]?: string;
} = (() => {
    return ALERT_TYPES.reduce((acc, type) => ({ ...acc, [type]: require(`./${type}.png`).default.src }), {});
})();
