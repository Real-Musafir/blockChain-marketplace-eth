import { useEffect } from "react";
import useSWR from "swr";

export const handler = (web3, provider) => () => {
  //prettier-ignore
  const swrResponse = useSWR(() => 
    web3 ? "web3/network" : null,
      async () => {
        const netId = await web3.eth.net.getId();
        return netId;
      }
  );

  return {
    network: {
      ...swrResponse,
    },
  };
};
