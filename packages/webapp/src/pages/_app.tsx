import { Notifications } from '@mantine/notifications';
import '../styles/global.css';
import '@mantine/notifications/styles.css';

import SignerProvider from '../Context/Signer';
import React from 'react';
import '@mantine/core/styles.css';

import type { AppProps } from 'next/app';
import { createTheme, MantineProvider } from '@mantine/core';
import CurrentNetworkProvider, {
  CurrentNetworkContext,
} from '../Context/CurrentNetwork';

import { ApolloProvider } from 'react-apollo';
import { client } from '../lib/graphql/client';

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SignerProvider>
        <CurrentNetworkProvider>
          <MantineProvider defaultColorScheme="dark" theme={theme}>
            <Notifications position="bottom-center" />

            <Component {...pageProps} />
          </MantineProvider>
        </CurrentNetworkProvider>
      </SignerProvider>
    </ApolloProvider>
  );
}
