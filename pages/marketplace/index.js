import { useAccount } from "@components/hooks/web3/useAccount";
import { CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { WalletBar } from "@components/ui/web3";
import { getAllCourse } from "@content/courses/fetcher";

export default function Marketplace({ courses }) {
  const { account } = useAccount();
  return (
    <>
      <div className="py-4">
        <WalletBar address={account.data} />
        <CourseList courses={courses} />
      </div>
    </>
  );
}

export function getStaticProps() {
  const { data } = getAllCourse();
  return {
    props: {
      courses: data,
    },
  };
}

Marketplace.Layout = BaseLayout;
