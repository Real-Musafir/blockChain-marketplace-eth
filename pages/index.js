import { Breadcrumbs, Hero } from "@components/common";
import { CourseList } from "@components/common/course";
import { BaseLayout } from "@components/common/layout";
import { OrderCard } from "@components/order";
import { EthRates, WalletBar } from "@components/web3";

export default function Home() {
  return (
    <>
      <Hero />
      <Breadcrumbs />
      <WalletBar />
      <EthRates />
      <OrderCard />
      <CourseList />
    </>
  );
}

Home.Layout = BaseLayout;
