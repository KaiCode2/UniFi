// pages/_app.js

import "../styles/global.css";
import SignerProvider from "../Context/Signer";
import React from "react";

const App = ({ Component, pageProps }) => {
  console.log("hgello");
  return (
    <SignerProvider>
      <Component {...pageProps} />
    </SignerProvider>
  );
};

export default App;
