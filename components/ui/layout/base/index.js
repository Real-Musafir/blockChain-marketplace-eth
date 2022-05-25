import { Web3Provider } from "@components/providers";
import Footer from "@components/ui/common/footer";
import Navbar from "@components/ui/common/navbar";
import Script from "next/script";

export default function BaseLayout({ children }) {
  return (
    <>
      <Script
        src="/js/truffle-contract.js"
        strategy="beforeInteractive" //This means it will load first then Web3Provider load
      />
      <Web3Provider>
        <div className=" max-w-7xl mx-auto px-4">
          <Navbar />
          <div className="fit">{children}</div>
        </div>
        <Footer />
      </Web3Provider>
    </>
  );
}
