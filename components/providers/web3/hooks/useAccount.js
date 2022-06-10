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

      const account = accounts[0];
      if (!account) {
        throw new Error(
          "Cannot retreive an account. Please refresh the browser."
        );
      }

      return account;
    }
  );

  useEffect(() => {
    const mutator = (accounts) => mutate(accounts[0]) ?? null;
    provider?.on("accountsChanged", mutator);

    return () => {
      provider?.removeListener("accountsChanged", mutator);
    };
  }, [provider]);
  return {
    data,
    isAdmin: (data && addminAddress[web3.utils.keccak256(data)]) ?? false,
    mutate,
    ...rest,
  };
};
