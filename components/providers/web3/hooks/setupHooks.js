import { handler as createAccountHook } from "./useAccount";
import { handler as createNetworkHook } from "./useNetwork";
import { handler as createOwnedCourses } from "./useOwnedCourses";

export const setupHooks = (...deps) => {
  return {
    useAccount: createAccountHook(...deps),
    useNetwork: createNetworkHook(...deps),
    useOwnedCourses: createOwnedCourses(...deps),
  };
};
