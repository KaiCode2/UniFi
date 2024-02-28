import React, { FC, ReactNode } from 'react';
import { SafeProvider } from '@gnosis.pm/safe-apps-react-sdk';

interface Props {
  children?: ReactNode; 
}

const MySafeApp: FC<Props> = ({ children }) => {
  return (
    <SafeProvider>
      {children}
      {
        // app ui and logic here (job for   joe and kai 100x devs)
      }
    </SafeProvider>
  );
};

export default MySafeApp;
