import { useEffect } from "react";
import useSWR from "swr";

const addminAddress = {
  "0xa3a5371d7b9b5f7ef7c6dc6e49b1bd7450d466cc06de0cb4b1f3c181955d06d8": true,
};

export const handler = (web3, provider) => () => {
  const { data, mutate, ...rest } = useSWR(
    web3 ? "web3/accounts" : null,
    async () => {
      const accounts = await web3.eth.getAccounts();
      return accounts[0];
    }
  );

  useEffect(() => {
    provider &&
      provider.on("accountsChanged", (accounts) => {
        mutate(accounts[0]) ?? null;
      });
  }, [provider]);
  return {
    account: {
      data,
      isAdmin: (data && addminAddress[web3.utils.keccak256(data)]) ?? false,
      mutate,
      ...rest,
    },
  };
};
