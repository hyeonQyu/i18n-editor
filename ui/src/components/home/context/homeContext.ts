import React from 'react';

export interface IHomeContext {}

export const HomeContext = React.createContext<IHomeContext>({});

export const useHomeContext = () => React.useContext(HomeContext);
