import "../styles/global.css";
import SignerProvider from "../Context/Signer";
import React from "react";
import "@mantine/core/styles.css";

import type { AppProps } from "next/app";
import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SignerProvider>
      <MantineProvider theme={theme}>
        <Component {...pageProps} />
      </MantineProvider>
    </SignerProvider>
  );
}
