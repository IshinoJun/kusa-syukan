import { useContext } from 'react';
import { StorageContext } from '../contexts/StorageContext';
import Storage from 'react-native-storage';

export const useStorage = (): Storage | undefined => {
  const storage = useContext(StorageContext);

  return storage;
};
