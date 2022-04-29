import { useEffect } from "react";
import useSWR, { mutate } from "swr";

const NETWORKS = {
  1: "Ethererum Main Network",
  3: "Ropstem Test Network",
  4: "Rinkeby Test Network",
  5: "Goerli Test Network",
  42: "Kovan Test Network",
  16: "Binance Smart Chain",
  1337: "Ganache",
};

const targetNetwork = NETWORKS[process.env.NEXT_PUBLIC_TARGET_CHAIN_ID];

export const handler = (web3, provider) => () => {
  //prettier-ignore
  const {data, mutate, ...rest} = useSWR(() => 
    web3 ? "web3/network" : null,
      async () => {
        const chainId = await web3.eth.getChainId();
        return NETWORKS[chainId];
      }
  );

  useEffect(() => {
    provider &&
      provider.on("chainChanged", (chainId) =>
        mutate(NETWORKS[parseInt(chainId, 16)])
      );
  }, [web3]);

  return {
    network: {
      data,
      mutate,
      target: targetNetwork,
      isSupported: data === targetNetwork,
      ...rest,
    },
  };
};
