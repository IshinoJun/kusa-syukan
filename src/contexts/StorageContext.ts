import React from 'react';
import Storage from 'react-native-storage';

export const StorageContext = React.createContext<Storage | undefined>(undefined);
