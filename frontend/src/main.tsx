import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import theme from "./theme";
import MetaMaskAccountProvider from "./context/MetaMaskAccountProvider";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <MetaMaskAccountProvider>
        <Toaster />
        <App />
      </MetaMaskAccountProvider>
    </ChakraProvider>
  </React.StrictMode>
);
