import { useContext } from 'react';
import { createContext } from 'react';
import { DeviceDetailBaseInfo } from '../types';

interface Options {
  id?: string;
  data?: DeviceDetailBaseInfo;
  loadInfo?: () => void;
}

export const DeviceInfoContext = createContext<Options>({});

export function useDeviceInfo() {
  const context = useContext(DeviceInfoContext);

  return {
    info: context.data,
    id: context.id!,
    loadInfo: context.loadInfo,
  };
}
