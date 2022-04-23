import detectEthereumProvider from "@metamask/detect-provider";
import { useState, useEffect } from "react";
import Web3 from "web3";
const { createContext, useContext } = require("react");

const Web3Context = createContext(null);

export default function Web3Provider({ children }) {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null,
    isInitialized: false,
  });

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider;
      if (provider) {
        const web3 = new Web3(provider);

        setWeb3Api({
          provider,
          web3,
          contract: null,
          isInitialized: true,
        });
      } else {
        setWeb3Api((api) => ({ ...api, isInitialized: true }));
        console.log("Please, Install Metamask");
      }
    };
    loadProvider();
  }, []);
  return (
    //prettier-ignore
    <Web3Context.Provider value={web3Api}>
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  return useContext(Web3Context);
}
