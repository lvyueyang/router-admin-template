import { UserInfo } from '@/services/interface';
import { createContext } from 'react';

interface Options {
  data?: UserInfo;
  loadInfo?: () => void;
}

const UserInfoContext = createContext<Options>({});

export default UserInfoContext;
