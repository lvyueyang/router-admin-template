import React from 'react';
import { ConfigProvider } from 'antd';

export function ThemeProvider({ children }: React.PropsWithChildren) {
  return (
    <ConfigProvider
      theme={{
        token: {
          // algorithm: theme.darkAlgorithm,
          colorPrimary: '#081c42',
          colorInfo: '#0288D1',
          colorSuccess: '#2E7D32',
          colorWarning: '#ED6C02',
          colorError: '#D32F2F',
          colorLink: '#081c42',
          colorLinkHover: '#000000',
          borderRadius: 4,
          sizeStep: 4.5,
          controlHeight: 36.5,
          Button: {
            controlOutline: 'rgba(0,0,0,0)',
          },
          Alert: {
            colorErrorBg: '#D32F2F',
            colorErrorBorder: '#D32F2F',
            colorError: '#fff',
            colorSuccessBg: '#2E7D32',
            colorSuccessBorder: '#2E7D32',
            colorSuccess: '#fff',
            colorWarningBg: '#ED6C02',
            colorWarningBorder: '#ED6C02',
            colorWarning: '#fff',
            colorInfoBg: '#0288D1',
            colorInfoBorder: '#0288D1',
            colorInfo: '#fff',
            colorIcon: '#fff',
            colorText: '#fff',
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
