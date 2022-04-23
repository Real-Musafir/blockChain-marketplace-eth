import { Web3Provider } from "@components/providers";
import Footer from "@components/ui/common/footer";
import Navbar from "@components/ui/common/navbar";

export default function BaseLayout({ children }) {
  return (
    <Web3Provider>
      <div className=" max-w-7xl mx-auto px-4">
        <Navbar />
        <div className="fit">{children}</div>
      </div>
      <Footer />
    </Web3Provider>
  );
}
