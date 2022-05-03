import { useNetwork, useAccount } from "@components/hooks/web3";
import { Button } from "@components/ui/common";
import { CourseCard, CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { OrderModal } from "@components/ui/order";
import { WalletBar } from "@components/ui/web3";
import { getAllCourse } from "@content/courses/fetcher";
import { useState } from "react";

export default function Marketplace({ courses }) {
  const { account } = useAccount();
  const { network } = useNetwork();

  const [selectedCourse, setSelectedCourse] = useState(null);

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
                  <Button
                    onClick={() => setSelectedCourse(course)}
                    variant="lightPurple"
                  >
                    Purchase
                  </Button>
                </div>
              )}
            />
          )}
        </CourseList>
        {selectedCourse && (
          <OrderModal
            course={selectedCourse}
            onClose={() => setSelectedCourse(null)}
          />
        )}
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
