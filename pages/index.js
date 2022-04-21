import { Breadcrumbs, Footer, Hero, Navbar } from "@components/common";
import { CourseList } from "@components/common/course";
import { OrderCard } from "@components/order";
import { EthRates, WalletBar } from "@components/web3";

export default function Home() {
  return (
    <div>
      <div className="relative bg-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4">
          <Navbar />

          <div className="fit">
            <Hero />

            <Breadcrumbs />

            <WalletBar />

            <EthRates />

            <OrderCard />
            <CourseList />
          </div>
        </div>
        {/*------ FOOTER STARTS ------*/}
        <Footer />
        {/*------ FOOTER ENDS ------*/}
      </div>
    </div>
  );
}
