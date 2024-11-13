import React from 'react';

export const PortalContext = React.createContext<HTMLDivElement | null>(null);

export const usePortalContext = () => React.useContext(PortalContext);
