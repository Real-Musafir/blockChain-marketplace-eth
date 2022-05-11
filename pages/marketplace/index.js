import { useWalletInfo } from "@components/hooks/web3";
import { Breadcrumbs, Button } from "@components/ui/common";
import { CourseCard, CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { OrderModal } from "@components/ui/order";
import { EthRates, WalletBar } from "@components/ui/web3";
import { getAllCourse } from "@content/courses/fetcher";
import { useState } from "react";

export default function Marketplace({ courses }) {
  const { canPurchaseCourse } = useWalletInfo();

  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <>
      <div className="pt-4">
        <WalletBar />
        <EthRates />
        <div className="flex flex-row-reverse py-4 px-4 sm:px-6 lg:px-8">
          <Breadcrumbs />
        </div>
        <CourseList courses={courses}>
          {(course) => (
            <CourseCard
              key={course.id}
              disabled={!canPurchaseCourse}
              course={course}
              Footer={() => (
                <div className="mt-4">
                  <Button
                    onClick={() => setSelectedCourse(course)}
                    variant="lightPurple"
                    disabled={!canPurchaseCourse}
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
