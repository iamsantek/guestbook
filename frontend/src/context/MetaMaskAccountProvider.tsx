import { useState, useEffect, createContext, useContext } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { Maybe } from "@metamask/providers/dist/utils";
import { ethers } from "ethers";

interface MetaMaskContext {
  ethereum: ethers.providers.ExternalProvider | MetaMaskInpageProvider | undefined;
  connectedAccount: string | undefined;
  connectAccount: () => Promise<void>;
}

const MetaMaskAccountContext = createContext<MetaMaskContext>({
  ethereum: undefined,
  connectedAccount: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  connectAccount: async () => {},
});

interface Window {
  ethereum?: MetaMaskInpageProvider;
}

export default function MetaMaskAccountProvider({ children }: any) {
  const [ethereum, setEthereum] = useState<MetaMaskInpageProvider | undefined>(
    undefined
  );
  const [connectedAccount, setConnectedAccount] = useState<
    string | undefined
  >();

  const setEthereumFromWindow = async () => {
    if ((window as Window).ethereum) {
      // Reload if chain changes, see <https://docs.metamask.io/guide/ethereum-provider.html#chainchanged>
      (window as Window).ethereum?.on("chainChanged", (_chainId) =>
        window.location.reload()
      );
      const chainId = await (window as Window).ethereum?.request({
        method: "eth_chainId",
      });
      const rinkebyId = "0x4"; // See <https://docs.metamask.io/guide/ethereum-provider.html#chain-ids>
      if (chainId === rinkebyId) {
        setEthereum((window as Window).ethereum);
      } else {
        alert("Please use Rinkeby network");
      }
    }
  };

  useEffect(() => {
    setEthereumFromWindow();
  }, []);

  const handleAccounts = (accounts: string[]) => {
    if (accounts.length > 0) {
      const account = accounts[0];
      console.log("We have an authorized account: ", account);
      setConnectedAccount(account);
    } else {
      console.log("No authorized accounts yet");
    }
  };

  const getConnectedAccount = async () => {
    if (ethereum) {
      const accounts: Maybe<string[]> = await ethereum.request({
        method: "eth_accounts",
      });
      handleAccounts(accounts as string[]);
    }
  };
  useEffect(() => {
    getConnectedAccount();
  }, []);

  const connectAccount = async () => {
    if (!ethereum) {
      console.error("Ethereum object is required to connect an account");
      return;
    }

    const accounts: Maybe<string[]> = await ethereum.request({
      method: "eth_requestAccounts",
    });
    handleAccounts(accounts as string[]);
  };

  const value = { ethereum, connectedAccount, connectAccount };

  return (
    <MetaMaskAccountContext.Provider value={value}>
      {children}
    </MetaMaskAccountContext.Provider>
  );
}

export function useMetaMaskAccount() {
  return useContext(MetaMaskAccountContext);
}
