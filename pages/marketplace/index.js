import { useNetwork, useAccount } from "@components/hooks/web3";
import { Button } from "@components/ui/common";
import { CourseCard, CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { WalletBar } from "@components/ui/web3";
import { getAllCourse } from "@content/courses/fetcher";

export default function Marketplace({ courses }) {
  const { account } = useAccount();
  const { network } = useNetwork();

  return (
    <>
      <div className="py-4">
        <WalletBar
          address={account.data}
          network={{
            data: network.data,
            target: network.target,
            isSupported: network.isSupported,
            hasInitialResponse: network.hasInitialResponse,
          }}
        />
        <CourseList courses={courses}>
          {(course) => (
            <CourseCard
              key={course.id}
              course={course}
              Footer={() => (
                <div className="mt-4">
                  <Button variant="lightPurple">Purchase</Button>
                </div>
              )}
            />
          )}
        </CourseList>
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
