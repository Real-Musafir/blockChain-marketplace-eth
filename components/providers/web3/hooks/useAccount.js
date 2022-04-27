import { useEffect } from "react";
import useSWR from "swr";

const addminAddress = {
  "0x10CCD2129D58c8F93beb13892CDC3cbf09E0EC9e": true,
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
      isAdmin: (data && addminAddress[data]) ?? false,
      mutate,
      ...rest,
    },
  };
};
